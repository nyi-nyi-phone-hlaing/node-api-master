import crypto from "crypto";

/**
 * တကယ့်ကို ခိုင်ခံ့ပြီး Secure ဖြစ်တဲ့ UUID v4 ထုတ်ပေးရန်
 * (RFC 4122 Standard Compliant)
 */
const generateUUID = () => {
  // 1. ခေတ်သစ် Node.js (v14.17.0+) အတွက် တိုက်ရိုက်သုံးမယ်
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  // 2. Fallback: Node ဗားရှင်းအနိမ့်တွေအတွက် Cryptographically Secure ဖြစ်အောင် ကိုယ်တိုင်ထုတ်မယ်
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.randomBytes(1).readUInt8() & (15 >> (c / 4)))).toString(16),
  );
};

export default generateUUID;
