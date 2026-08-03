// A thin reader over a .tsx file, for the lint rules.
//
// Built on the TypeScript compiler API because `typescript` is already a devDependency
// and a real AST is the difference between a rule and a regex that fires on a comment.
// Nothing here knows what a rule is; it only answers questions about the source.

import {readFileSync} from 'node:fs';
import ts from 'typescript';

/** Parse a .tsx file. `true` keeps parent pointers, which the position helpers need. */
export const parse = (filePath) =>
  ts.createSourceFile(
    filePath,
    readFileSync(filePath, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

/** Depth-first walk over every node. */
export const walk = (node, visit) => {
  visit(node);
  node.forEachChild((child) => walk(child, visit));
};

const collect = (root, predicate) => {
  const found = [];
  walk(root, (node) => {
    if (predicate(node)) found.push(node);
  });
  return found;
};

/** 1-indexed line number, for an error message that can be clicked. */
export const lineOf = (sourceFile, node) =>
  sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;

/** Every JSX element, self-closing or not. */
export const jsxElements = (root) =>
  collect(
    root,
    (node) => ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node),
  );

/** `<Foo.Bar />` -> "Foo.Bar". */
export const tagOf = (element) => element.tagName.getText();

/** Named attributes of one JSX element, as a Map. Spreads are not represented. */
export const attrsOf = (element) => {
  const map = new Map();
  for (const property of element.attributes.properties) {
    if (ts.isJsxAttribute(property) && property.name) {
      map.set(property.name.getText(), property);
    }
  }
  return map;
};

/**
 * The text of a string-valued attribute — `title="Route across displays"` or
 * `title={'…'}`. Returns null for anything computed, which the caller should treat as
 * "cannot tell" rather than "absent".
 */
export const attrText = (element, name) => {
  const attribute = attrsOf(element).get(name);
  if (!attribute?.initializer) return null;
  const {initializer} = attribute;
  if (ts.isStringLiteral(initializer)) return initializer.text;
  if (
    ts.isJsxExpression(initializer) &&
    initializer.expression &&
    (ts.isStringLiteral(initializer.expression) ||
      ts.isNoSubstitutionTemplateLiteral(initializer.expression))
  ) {
    return initializer.expression.text;
  }
  return null;
};

/** The numeric value of an attribute like `durationInFrames={108}`, or null. */
export const attrNumber = (element, name) => {
  const attribute = attrsOf(element).get(name);
  const expression = attribute?.initializer;
  if (!expression || !ts.isJsxExpression(expression) || !expression.expression) return null;
  const inner = expression.expression;
  if (ts.isNumericLiteral(inner)) return Number(inner.text);
  // `from={-40}` parses as a prefix minus, not a negative literal.
  if (
    ts.isPrefixUnaryExpression(inner) &&
    inner.operator === ts.SyntaxKind.MinusToken &&
    ts.isNumericLiteral(inner.operand)
  ) {
    return -Number(inner.operand.text);
  }
  return null;
};

/** Every call to a named function, e.g. `interpolate(...)` or `staticFile(...)`. */
export const callsNamed = (root, name) =>
  collect(
    root,
    (node) =>
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === name,
  );

/** Every `style={{ … }}` object literal. */
export const styleObjects = (root) => {
  const found = [];
  for (const element of jsxElements(root)) {
    const style = attrsOf(element).get('style');
    const expression = style?.initializer;
    if (
      expression &&
      ts.isJsxExpression(expression) &&
      expression.expression &&
      ts.isObjectLiteralExpression(expression.expression)
    ) {
      found.push({element, object: expression.expression});
    }
  }
  return found;
};

/**
 * A fingerprint of a style object's *static* properties — every entry whose value
 * contains no call expression.
 *
 * Animated properties are excluded deliberately. Ten blocks that each fade at a
 * different frame are still ten copies of one block if their position, size, colour and
 * type are identical, and that is exactly the shape duplicated slop takes: vary the one
 * number that has to vary, leave the rest.
 *
 * Returns null when fewer than `minProperties` static entries survive, so small style
 * objects — which are legitimately repetitive — never collide.
 */
export const staticStyleHash = (object, minProperties = 4) => {
  const entries = [];
  for (const property of object.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const value = property.initializer;
    let hasCall = false;
    walk(value, (node) => {
      if (ts.isCallExpression(node)) hasCall = true;
    });
    if (hasCall) continue;
    entries.push(`${property.name.getText()}:${value.getText().replace(/\s+/g, '')}`);
  }
  if (entries.length < minProperties) return null;
  return entries.sort().join('|');
};

export {ts};
