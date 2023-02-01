export type println = (text: string) => void;

export interface Command {
    doc: (p: println) => void,
    cmd: (args: string[], p: println) => void
}