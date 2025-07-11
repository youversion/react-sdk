import { MixedStyleRecord } from "react-native-render-html";

const tagsStyles: MixedStyleRecord = {
  // Hidden elements
  id: { display: "none" },
  ide: { display: "none" },
  sts: { display: "none" },
  rem: { display: "none" },
  toc1: { display: "none" },
  toc2: { display: "none" },
  toc3: { display: "none" },
  imte: { display: "none" },
  ie: { display: "none" },
  mte: { display: "none" },
  cl: { display: "none" },

  // Chapter and verse styles
  ".chapter > .label": { display: "none" },

  ".verse > .label": {
    fontSize: 8, // .5em of 16px
    lineHeight: 8, // 1em of 8px
    color: "#2B3031",
    paddingRight: 0.3 * 16, // .3em of 16px
    position: "relative",
    top: -0.6 * 16, // -.6em of 16px
  },

  fv: {
    fontSize: 8,
    lineHeight: 8,
    color: "#2B3031",
    paddingRight: 0.3 * 16,
    position: "relative",
    top: -0.6 * 16,
  },

  vp: {
    fontSize: 8,
    lineHeight: 8,
    color: "#777",
    position: "relative",
    top: -0.6 * 16,
  },

  // Title and heading styles
  imt: {
    fontSize: 1.3 * 16,
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginTop: 1 * 16,
    marginBottom: 0,
  },

  imt1: {
    fontSize: 1.3 * 16,
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginTop: 1 * 16,
    marginBottom: 0,
  },

  mt: {
    fontSize: 1.3 * 16,
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginTop: 1 * 16,
    marginBottom: 0,
  },

  mt1: {
    fontSize: 1.3 * 16,
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginTop: 1 * 16,
    marginBottom: 0,
  },

  ms: {
    fontSize: 1.3 * 16,
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginTop: 1 * 16,
    marginBottom: 0,
  },

  ms1: {
    fontSize: 1.3 * 16,
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginTop: 1 * 16,
    marginBottom: 0,
  },

  iot: {
    fontSize: 1.3 * 16,
    fontWeight: "700",
    lineHeight: 1.8 * 16,
    marginVertical: 0.5 * 16,
  },

  io: {
    marginLeft: 1 * 16,
  },

  io1: {
    marginLeft: 1 * 16,
  },

  io2: {
    marginLeft: 2 * 16,
  },

  io3: {
    marginLeft: 2 * 16,
  },

  ipi: {},

  imt2: {
    lineHeight: 1.8 * 16,
    marginVertical: 0.5 * 16,
    fontWeight: "bold",
  },

  imt3: {
    lineHeight: 1.8 * 16,
    marginVertical: 0.5 * 16,
    fontWeight: "bold",
  },

  imt4: {
    lineHeight: 1.8 * 16,
    marginVertical: 0.5 * 16,
    fontWeight: "bold",
  },

  mt2: {
    lineHeight: 1.8 * 16,
    marginVertical: 0.5 * 16,
    fontWeight: "bold",
  },

  mt3: {
    lineHeight: 1.8 * 16,
    marginVertical: 0.5 * 16,
    fontWeight: "bold",
  },

  mt4: {
    lineHeight: 1.8 * 16,
    marginVertical: 0.5 * 16,
    fontWeight: "bold",
  },

  // Section styles
  is: {
    fontSize: 1.1 * 16,
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginBottom: 0.5 * 16,
  },

  s: {
    fontSize: 1.1 * 16,
    fontWeight: "bold",
    lineHeight: 1 * 16,
    marginBottom: 0.5 * 16,
  },

  s1: {
    fontSize: 1.1 * 16,
    fontWeight: "bold",
    lineHeight: 1 * 16,
    marginBottom: 0.5 * 16,
  },

  is1: {
    fontSize: 1.1 * 16,
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginBottom: 0.5 * 16,
  },

  is2: {
    fontSize: 1.1 * 16,
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginBottom: 0.5 * 16,
  },

  s2: {
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginTop: 1 * 16,
    marginBottom: 0.5 * 16,
  },

  s3: {
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginTop: 1 * 16,
    marginBottom: 0.5 * 16,
  },

  s4: {
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginTop: 1 * 16,
    marginBottom: 0.5 * 16,
  },

  ms2: {
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginTop: 1 * 16,
    marginBottom: 0.5 * 16,
  },

  ms3: {
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginTop: 1 * 16,
    marginBottom: 0.5 * 16,
  },

  ms4: {
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginTop: 1 * 16,
    marginBottom: 0.5 * 16,
  },

  ".heading": {
    fontWeight: "bold",
    lineHeight: 1.8 * 16,
    marginBottom: 0.5 * 16,
  },

  // Paragraph styles
  p: {
    marginBottom: 0,
    lineHeight: 1.8 * 16,
    margin: 0,
  },

  ip: {
    marginBottom: 0,
    lineHeight: 1.8 * 16,
    margin: 0,
  },

  im: {
    lineHeight: 1.8 * 16,
    margin: 0,
  },

  iex: {
    lineHeight: 1.8 * 16,
    margin: 0,
  },

  m: {
    lineHeight: 1.8 * 16,
    margin: 0,
  },

  nb: {
    lineHeight: 1.8 * 16,
    margin: 0,
  },

  cls: {
    lineHeight: 1.8 * 16,
    margin: 0,
  },

  // Indented paragraphs
  imi: {
    lineHeight: 1.8 * 16,
    marginHorizontal: 1 * 16,
    marginLeft: 1.5 * 16,
  },

  pm: {
    lineHeight: 1.8 * 16,
    marginHorizontal: 1 * 16,
  },

  pmc: {
    lineHeight: 1.8 * 16,
    marginHorizontal: 1 * 16,
  },

  pi: {
    lineHeight: 1.8 * 16,
    marginHorizontal: 1 * 16,
  },

  pi1: {
    lineHeight: 1.8 * 16,
    marginHorizontal: 1 * 16,
  },

  pi2: {
    lineHeight: 1.8 * 16,
    marginHorizontal: 1 * 16,
  },

  pi3: {
    lineHeight: 1.8 * 16,
    marginHorizontal: 1 * 16,
  },

  mi: {
    lineHeight: 1.8 * 16,
    marginHorizontal: 1 * 16,
  },

  // Alignment styles
  ipr: { textAlign: "right" },
  pr: { textAlign: "right" },
  qr: { textAlign: "right", fontStyle: "italic" },
  pmr: { textAlign: "right", marginRight: 0.3 * 16 },
  pc: { textAlign: "center" },
  qc: { textAlign: "center" },

  // Quote styles
  iq: {
    paddingLeft: 2 * 16,
    lineHeight: 1.8 * 16,
  },

  iq1: {
    paddingLeft: 2 * 16,
    lineHeight: 1.8 * 16,
  },

  q: {
    paddingLeft: 2 * 16,
    lineHeight: 1.8 * 16,
  },

  q1: {
    paddingLeft: 2 * 16,
    lineHeight: 1.8 * 16,
  },

  qm1: {
    paddingLeft: 2 * 16,
    lineHeight: 1.8 * 16,
  },

  iq2: {
    paddingLeft: 2 * 16,
    lineHeight: 1.8 * 16,
  },

  q2: {
    paddingLeft: 2 * 16,
    lineHeight: 1.8 * 16,
  },

  qm2: {
    paddingLeft: 2 * 16,
    lineHeight: 1.8 * 16,
  },

  iq3: {
    paddingLeft: 2 * 16,
    lineHeight: 1.8 * 16,
    fontStyle: "normal",
  },

  q3: {
    paddingLeft: 2 * 16,
    lineHeight: 1.8 * 16,
    fontStyle: "normal",
  },

  qm3: {
    paddingLeft: 2 * 16,
    lineHeight: 1.8 * 16,
    fontStyle: "normal",
  },

  q4: {
    paddingLeft: 2 * 16,
    lineHeight: 1.8 * 16,
    fontStyle: "normal",
  },

  iqt: {
    marginLeft: 1 * 16,
  },

  // Line break styles
  lb: {
    lineHeight: 1.8 * 16,
    height: 1.5 * 16,
  },

  b: {
    lineHeight: 1.8 * 16,
    height: 1 * 16,
  },

  // List styles
  ili: {
    marginLeft: 2 * 16,
    paddingLeft: 0,
    lineHeight: 1.8 * 16,
  },

  ili1: {
    marginLeft: 2 * 16,
    paddingLeft: 0,
    lineHeight: 1.8 * 16,
  },

  li1: {
    marginLeft: 2 * 16,
    lineHeight: 1.8 * 16,
    paddingLeft: 2 * 16,
  },

  li: {
    marginLeft: 2 * 16,
    paddingLeft: 0,
    lineHeight: 1.8 * 16,
  },

  ili2: {
    marginLeft: 2 * 16,
    paddingLeft: 0,
    lineHeight: 1.8 * 16,
  },

  li2: {
    marginLeft: 2 * 16,
    lineHeight: 1.8 * 16,
    paddingLeft: 2 * 16,
  },

  ili3: {
    marginLeft: 2 * 16,
    paddingLeft: 0,
    lineHeight: 1.8 * 16,
  },

  li3: {
    marginLeft: 2 * 16,
    paddingLeft: 0,
    lineHeight: 1.8 * 16,
  },

  // Other text styles
  d: {
    fontSize: 1.0 * 16,
    lineHeight: 1.8 * 16,
    fontStyle: "italic",
    marginBottom: 1 * 16,
  },

  qa: {
    fontSize: 1.0 * 16,
    lineHeight: 1.8 * 16,
  },

  ior: { fontStyle: "italic" },
  bk: { fontStyle: "italic" },
  sls: { fontStyle: "italic" },
  tl: { fontStyle: "italic" },
  r: { fontStyle: "italic" },
  sp: { fontStyle: "italic" },
  sr: { fontStyle: "italic" },
  rq: { fontStyle: "italic" },

  mr: {
    fontStyle: "italic",
    fontWeight: "bold",
  },

  ph: {
    paddingLeft: 2 * 16,
  },

  ph1: {
    paddingLeft: 2 * 16,
  },

  ph2: {
    paddingLeft: 4 * 16,
  },

  qs: {
    fontStyle: "italic",
    textAlign: "right",
  },

  lit: {
    fontStyle: "italic",
    textAlign: "right",
  },

  // Table styles
  table: {
    fontSize: "inherit",
    color: "inherit",
    borderBottomWidth: 1 * 16,
  },

  th: {
    backgroundColor: "#444",
    color: "#fff",
    fontWeight: "bold",
    padding: 0,
    lineHeight: 1.8 * 16,
  },

  th1: {
    backgroundColor: "#444",
    color: "#fff",
    fontWeight: "bold",
    padding: 0,
    lineHeight: 1.8 * 16,
  },

  thr: {
    textAlign: "right",
    fontWeight: "bold",
    padding: 0,
    lineHeight: 1.8 * 16,
  },

  thr1: {
    textAlign: "right",
    fontWeight: "bold",
    padding: 0,
    lineHeight: 1.8 * 16,
  },

  td: {
    padding: 0,
    lineHeight: 1.8 * 16,
  },

  tc: {
    padding: 0,
    lineHeight: 1.8 * 16,
  },

  tcr: {
    padding: 0,
    textAlign: "right",
  },

  tcr1: {
    padding: 0,
    textAlign: "right",
  },

  // Text formatting styles
  add: {
    padding: 0,
    margin: 0,
    lineHeight: 1.8 * 16,
    fontStyle: "italic",
    textTransform: "none",
    textDecorationLine: "none",
  },

  dc: {
    padding: 0,
    margin: 0,
    lineHeight: 1.8 * 16,
    fontStyle: "normal",
    textTransform: "none",
    textDecorationLine: "none",
    fontWeight: "normal",
  },

  k: {
    padding: 0,
    margin: 0,
    lineHeight: 1.8 * 16,
    fontStyle: "normal",
    textTransform: "none",
    textDecorationLine: "none",
    fontWeight: "normal",
  },

  qt: {
    padding: 0,
    margin: 0,
    lineHeight: 1.8 * 16,
    fontStyle: "italic",
    textTransform: "none",
    textDecorationLine: "none",
  },

  sig: {
    padding: 0,
    margin: 0,
    lineHeight: 1.8 * 16,
    fontStyle: "normal",
    textTransform: "none",
    textDecorationLine: "none",
    fontWeight: "normal",
  },

  nd: {
    fontVariant: ["small-caps"],
  },

  ord: {
    fontSize: 0.75 * 16,
    lineHeight: 0,
    position: "relative",
    top: -0.5 * 16,
  },

  pn: {
    textDecorationLine: "underline",
  },

  em: { fontWeight: "bold" },
  bd: { fontWeight: "bold" },

  it: { fontStyle: "italic" },
  cd: { fontStyle: "italic" },
  fq: { fontStyle: "italic" },

  bdit: {
    fontWeight: "bold",
    fontStyle: "italic",
  },

  no: {
    fontWeight: "normal",
    fontStyle: "normal",
  },

  sc: {
    fontVariant: ["small-caps"],
  },

  a: {
    color: "#888",
  },

  // Note styles
  ".note": {},

  ".note > .label": {
    // verticalAlign: "baseline",
    cursor: "pointer",
    // display: "inline-block",
    // textIndent: -9999,
    paddingHorizontal: 0.15 * 16,
    // backgroundRepeat: "no-repeat", // Not supported in RN
    height: 16,
    width: 16,
    color: "rgba(0, 0, 0, 0)",
  },

  ".note > .body": {
    display: "none",
    color: "#414141",
    padding: 10,
    borderRadius: 2,
    marginBottom: 1 * 16,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
  },

  ".note_close": {
    textAlign: "center",
    marginTop: 10,
    paddingVertical: 5,
    textDecorationLine: "none",
    fontWeight: "normal",
    fontSize: 14,
    borderRadius: 5,
    color: "#999",
    backgroundColor: "transparent",
  },

  // Notes within headings
  ".s1 .note .heading": {
    fontSize: 0.67 * 16,
    fontWeight: "normal",
    fontStyle: "normal",
  },

  ".s .note .heading": {
    fontSize: 0.67 * 16,
    fontWeight: "normal",
    fontStyle: "normal",
  },

  ".s1 .note_close": {
    fontSize: 0.67 * 16,
  },

  ".s .note_close": {
    fontSize: 0.67 * 16,
  },

  ".s .note": {
    fontSize: 0.9 * 16,
  },

  ".is .note": {
    fontSize: 0.9 * 16,
  },

  ".s1 .note": {
    fontSize: 0.9 * 16,
  },

  ".ms1 .note": {
    fontSize: 0.9 * 16,
  },

  ".is1 .note": {
    fontSize: 0.9 * 16,
  },

  ".is2 .note": {
    fontSize: 0.9 * 16,
  },

  ".mr .note": {
    fontSize: 0.9 * 16,
  },

  // Note formatting
  ".note .fr": {
    paddingRight: 5,
  },

  ".note .fq": {
    fontStyle: "italic",
  },

  ".note .fqa": {
    fontStyle: "italic",
  },

  ".note .fv": {
    fontSize: 0.75 * 16,
  },

  ".note .fk": {
    fontStyle: "italic",
    fontWeight: "bold",
  },

  // Verse styles
  ".verse": {},

  ".verse.highlighted": {
    borderRadius: 4,
  },

  ".verse.selecting.highlighted": {
    backgroundColor: "transparent",
  },

  ".verse.selecting.highlighted > .label": {
    borderRadius: 2,
    padding: 0,
    marginRight: 0.2 * 16,
  },

  ".verse.saved > .label": {
    paddingTop: 0.4 * 16,
    paddingHorizontal: 0.5 * 16,
    paddingBottom: 0.8 * 16,
    cursor: "pointer",
    borderRadius: 4,
    marginRight: 4,
  },

  // Publisher styles
  ".publisher": {
    marginTop: 0,
    paddingHorizontal: 20,
    borderRadius: 2,
    textAlign: "center",
  },

  ".publisher .copyright": {
    marginBottom: 0,
    color: "#888",
    fontSize: 12,
    lineHeight: 18,
  },

  ".publisher .ad": {
    color: "#888",
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
  },

  ".publisher .button": {
    marginTop: 0,
    padding: 0,
    height: 24,
    lineHeight: 24,
    textDecorationLine: "underline",
    fontSize: 12,
    color: "#6AB750",
    textAlign: "center",
    backgroundColor: "transparent",
  },

  // Container button
  "#containerButton": {
    display: "none",
    marginTop: 1 * 16,
    marginHorizontal: "auto",
    width: "80%",
    textAlign: "center",
    paddingHorizontal: 15,
    borderRadius: 48,
    borderColor: "transparent",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: -0.2,
    height: 48,
    lineHeight: 44,
    color: "#000",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },

  // Subscript and superscript
  ".sub": {
    fontSize: 0.75 * 16,
    lineHeight: 0,
    position: "relative",
    bottom: -0.1 * 16,
  },

  ".sup": {
    fontSize: 0.75 * 16,
    lineHeight: 0,
    position: "relative",
    top: -0.25 * 16,
  },

  // Light theme styles
  ".light": {
    color: "#414141",
  },

  ".light .selected": {
    borderBottomWidth: 3,
    borderBottomColor: "#888",
    borderStyle: "dotted",
  },

  ".light .underline": {
    borderBottomWidth: 1,
    borderBottomColor: "#414141",
    borderStyle: "solid",
  },

  ".light .verse.selecting.highlighted .content": {
    color: "#3f3f3e",
  },

  ".light .verse.selecting.highlighted .wj .content": {
    color: "#FF3D4D",
  },

  ".light #containerButton": {
    color: "black",
  },

  ".light .note_close": {
    color: "#414141",
    backgroundColor: "transparent",
  },

  ".light .wj": {
    color: "#FF3D4D",
  },

  ".light .note > .body": {
    backgroundColor: "transparent",
  },

  // Dark theme styles
  ".dark .wj": {
    color: "#F04C59",
  },

  ".dark .selected": {
    borderBottomWidth: 3,
    borderBottomColor: "white",
    borderStyle: "dotted",
  },

  ".dark #containerButton": {
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

  ".dark .publisher": {
    backgroundColor: "#000000",
  },

  ".dark .publisher .ad": {
    color: "#999",
  },

  ".dark .publisher .button": {
    color: "#fff",
  },

  ".dark .note > .body": {
    color: "#999",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#353535",
    borderStyle: "solid",
  },

  ".dark .note_close": {
    color: "#eee",
  },

  ".dark .verse > .label": {
    color: "#FFFFFF",
  },
};

// RTL (Right-to-left) specific styles
const rtlStyles: MixedStyleRecord = {
  ".rtl .qs": {
    textAlign: "left",
  },

  ".rtl .lit": {
    textAlign: "left",
  },

  ".rtl .iq": {
    paddingLeft: 0,
    paddingRight: 2 * 16,
  },

  ".rtl .iq1": {
    paddingLeft: 0,
    paddingRight: 2 * 16,
  },

  ".rtl .q": {
    paddingLeft: 0,
    paddingRight: 2 * 16,
  },

  ".rtl .q1": {
    paddingLeft: 0,
    paddingRight: 2 * 16,
  },

  ".rtl .qm1": {
    paddingLeft: 0,
    paddingRight: 2 * 16,
  },

  ".rtl .li1": {
    paddingLeft: 0,
    paddingRight: 2 * 16,
  },

  ".rtl .iq2": {
    paddingLeft: 0,
    paddingRight: 2 * 16,
  },

  ".rtl .q2": {
    paddingLeft: 0,
    paddingRight: 2 * 16,
  },

  ".rtl .qm2": {
    paddingLeft: 0,
    paddingRight: 2 * 16,
  },

  ".rtl .li2": {
    paddingLeft: 0,
    paddingRight: 2 * 16,
  },

  ".rtl .iq3": {
    paddingLeft: 0,
    paddingRight: 2 * 16,
  },

  ".rtl .q3": {
    paddingLeft: 0,
    paddingRight: 2 * 16,
  },

  ".rtl .qm3": {
    paddingLeft: 0,
    paddingRight: 2 * 16,
  },

  ".rtl .q4": {
    paddingLeft: 0,
    paddingRight: 2 * 16,
  },
};

// Version-specific styles
const versionSpecificStyles: MixedStyleRecord = {
  // BOOKS VERSION
  ".vid31 .verse .label": { display: "none" },
  ".vid31 .s1": { display: "none" },
  ".vid31 .s1 + .p": { marginTop: 1.5 * 16 },
  ".vid31 .q2 + .q1": { marginTop: 0.25 * 16 },
  ".vid31 .note": { display: "none" },
  ".vid31 .dark .wj": { color: "inherit" },
  ".vid31 .light .wj": { color: "inherit" },
  ".vid31 .verse + .verse": { marginLeft: 3 },

  // Version 8, 58, 111
  // ".vid8 .content:after": { content: " " },
  // ".vid58 .content:after": { content: " " },
  // ".vid111 .content:after": { content: " " },
  // ".vid8 .nd .content:after": { content: "" },
  // ".vid58 .nd .content:after": { content: "" },
  // ".vid111 .nd .content:after": { content: "" },

  // Chinese versions
  ".iso6393zho .pn": { textDecorationLine: "underline" },

  // BB version
  ".vid1276 .add": { color: "#888" },

  // NIV versions
  ".vid111 .bkPSA .it": { marginBottom: 1 * 16 },
  ".vid111 .bkPSA .note .it": { marginBottom: 0 },
  ".vid111 .ms": { textTransform: "uppercase" },
  ".vid111 .sp": { marginTop: 0.5 * 16 },
  ".vid111 .d": {},
  ".vid111 .li": { marginTop: 0, marginBottom: 0 },
  ".vid111 .li1": { marginTop: 0, marginBottom: 0 },
  ".vid111 .li2": { marginTop: 0, marginBottom: 0 },
  ".vid111 .pi3": { marginLeft: 2 * 16 },
  ".vid111 .bkPSA .ch136 .qr": { fontStyle: "italic" },
  ".vid111 .s1 .heading": { fontWeight: "normal" },
  ".vid111 .s1": { fontStyle: "italic" },

  // NIVr, NIV, NIVUK small caps
  ".vid110 .pc": { fontVariant: ["small-caps"] },
  ".vid110 .qc": { fontVariant: ["small-caps"] },
  ".vid111 .pc": { fontVariant: ["small-caps"] },
  ".vid111 .qc": { fontVariant: ["small-caps"] },
  ".vid113 .pc": { fontVariant: ["small-caps"] },
  ".vid113 .qc": { fontVariant: ["small-caps"] },

  // ŽJ VERSION
  ".vid1383 .li": { marginLeft: 1 * 16 },

  // Hide cross references
  ".vid59 .note.x": { display: "none" },
  ".vid72 .note.x": { display: "none" },
  ".vid2376 .note.x": { display: "none" },

  // NABRE
  ".vid463 div.s2": { textAlign: "center" },

  // Naro NT
  ".vid1136 .add": { color: "#ccc" },

  // Amharic
  ".vid1260 .add": { fontSize: 0.6 * 16 },

  // THE VOICE Version
  ".vid1278 .p": { marginBottom: 1 * 16 },
  ".vid1278 .p + .b": { height: 0 },
  ".vid1278 .q1": { paddingLeft: 2 * 16 },

  // Bulgarian Protestant Bible
  ".vid1443 .k": { textAlign: "left", fontWeight: "bold" },

  // Bulgarian Orthodox Bible
  ".vid1558 .sls": { fontStyle: "normal" },

  // Passion Translation
  ".vid1849 .mt1": { textAlign: "center" },
  ".vid1849 .mt2": { textAlign: "center" },
  ".vid1849 .imt": { textAlign: "center" },
  ".vid1849 .is": { textAlign: "center" },

  // Crossway Greek NT
  ".vid2270 .p": { marginLeft: 1.5 * 16 },

  // Revised Dumitru Cornilescu Edition
  ".vid2311 .add": { fontStyle: "normal" },

  // Tagalog Form-Based Bible
  ".vid2196 .q1": { marginLeft: 1.5 * 16 },

  // Swedish Core Bible
  ".vid1111 .add": { fontSize: 0.85 * 16 },

  // Slovenian versions
  ".vid2051 .ms .heading": { fontSize: 1.3 * 16, fontWeight: "bold" },
  ".vid2051 .ms1 .heading": { fontSize: 1.3 * 16, fontWeight: "bold" },
  ".vid2319 .ms .heading": { fontSize: 1.3 * 16, fontWeight: "bold" },
  ".vid2319 .ms1 .heading": { fontSize: 1.3 * 16, fontWeight: "bold" },
  ".vid2051 .ms2 .heading": {
    fontSize: 1.3 * 16,
    fontStyle: "italic",
    fontWeight: "normal",
  },
  ".vid2319 .ms2 .heading": {
    fontSize: 1.3 * 16,
    fontStyle: "italic",
    fontWeight: "normal",
  },
  ".vid2051 .s .heading": { fontSize: 1 * 16, fontWeight: "bold" },
  ".vid2051 .s1 .heading": { fontSize: 1 * 16, fontWeight: "bold" },
  ".vid2319 .s .heading": { fontSize: 1 * 16, fontWeight: "bold" },
  ".vid2319 .s1 .heading": { fontSize: 1 * 16, fontWeight: "bold" },
  ".vid2051 .s2 .heading": {
    fontSize: 1 * 16,
    fontStyle: "italic",
    fontWeight: "normal",
  },
  ".vid2319 .s2 .heading": {
    fontSize: 1 * 16,
    fontStyle: "italic",
    fontWeight: "normal",
  },
  ".vid2051 .qa": { display: "none" },
  ".vid2319 .qa": { display: "none" },

  // The Love Fellowship - centered headings
  ".vid2766 .s": { textAlign: "center" },
  ".vid2767 .s": { textAlign: "center" },
  ".vid2768 .s": { textAlign: "center" },
  ".vid2769 .s": { textAlign: "center" },
  ".vid2778 .s": { textAlign: "center" },
  ".vid2766 .r": { textAlign: "center" },
  ".vid2767 .r": { textAlign: "center" },
  ".vid2768 .r": { textAlign: "center" },
  ".vid2769 .r": { textAlign: "center" },
  ".vid2778 .r": { textAlign: "center" },

  // TMA - centered headings
  ".vid1714 .s": { textAlign: "center" },
  ".vid1714 .ms": { textAlign: "center" },
  ".vid1714 .ms1": { textAlign: "center" },
  ".vid1714 .ms2": { textAlign: "center" },
  ".vid1714 .ms3": { textAlign: "center" },
  ".vid1714 .mt": { textAlign: "center" },
  ".vid1714 .mt1": { textAlign: "center" },
  ".vid1714 .mt2": { textAlign: "center" },
  ".vid1714 .mt3": { textAlign: "center" },
};

// Export combined styles
export const bibleTextStyles = {
  ...tagsStyles,
  ...rtlStyles,
  ...versionSpecificStyles,
  //   ...deviceStyles,
};

// Font face declarations would need to be handled separately in React Native
// as they require custom font loading through the app's assets
