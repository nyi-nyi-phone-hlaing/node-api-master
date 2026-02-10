/**
 * catchAsync - try-catch block တွေကို အစားထိုးရန်
 * @param {Function} fn - Async controller function
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    // ပေးလိုက်တဲ့ function ကို run မယ်၊ error တက်ရင် .catch() ကနေ next(err) ကို ပို့ပေးမယ်
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
