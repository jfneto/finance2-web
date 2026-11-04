interface OFXHeader {
  ofxHeader?: string
  data?: string
  version?: string
  security?: string
  enconding?: string
  charset?: string
  compression?: string
  oldFileUid?: string
  newFileUid?: string
}

export type { OFXHeader }
