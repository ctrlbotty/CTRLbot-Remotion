// Each Terminator screen at its natural size with nothing on top, in the state the
// recording shows it, for holding against a frame of the real app before any of it is
// animated. Registered under Surface-Proofs as `Proof-Term-*`.

import {TermApp, TermScan, TermSerial, TermSsh, TermTcpClient, TermTcpServer} from './Terminator';
import {TERM_ADAPTER, TERM_DEVICES, TERM_RAW_TCP, TERM_SERIAL, TERM_SERVER, TERM_SSH} from './termData';

export const TermScanProof = () => (
  <TermApp tab="scan">
    <TermScan adapter={TERM_ADAPTER} state={{status: 'complete', checked: TERM_ADAPTER.hosts, devices: TERM_DEVICES}} />
  </TermApp>
);

export const TermServerProof = () => (
  <TermApp tab="tcp-server">
    <TermTcpServer port={TERM_SERVER.port} listening clients={1} received={TERM_SERVER.received} sent={TERM_SERVER.sent} />
  </TermApp>
);

export const TermRawTcpProof = () => (
  <TermApp tab="tcp-client">
    <TermTcpClient host={TERM_RAW_TCP.host} port={TERM_RAW_TCP.port} connected received={TERM_RAW_TCP.received} sent={TERM_RAW_TCP.sent} />
  </TermApp>
);

export const TermSerialProof = () => (
  <TermApp tab="serial">
    <TermSerial {...TERM_SERIAL} open received={TERM_SERIAL.received} sent={TERM_SERIAL.sent} />
  </TermApp>
);

export const TermSshProof = () => (
  <TermApp tab="ssh">
    <TermSsh host={TERM_SSH.host} username={TERM_SSH.username} connected output={[TERM_SSH.connecting, ...TERM_SSH.output]} />
  </TermApp>
);
