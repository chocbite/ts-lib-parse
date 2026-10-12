import { array_from_length } from "@chocbite/ts-lib-common";
import { FETCH_PARSE, make_fetch_parser } from "./fetch_parse";

let zxcv = 0;
let abc = 0;
window.fetch = async (e, i) => {
  console.warn(e, i);
  return Promise.resolve(
    new Response(
      JSON.stringify({
        test: true,
        then: zxcv++,
        arr_fixed: [1, 2, 3],
        arr_fixed_obj: array_from_length(3, () => ({ test: false })),
        arr_dyn: array_from_length(Math.min(3, abc++), (i) => i),
        arr_dyn_obj: array_from_length(Math.min(3, abc++), () => ({
          test: false,
        })),
        obj: { test: false },
      }),
    ),
  );
};

const yo = make_fetch_parser(() => "/test", 2000, {
  test: "?b",
  then: "n",
  arr_fixed: [3, "n"],
  arr_fixed_obj: [
    3,
    {
      test: "?b",
    },
  ],
  arr_dyn: [0, "n"],
  arr_dyn_obj: [0, { test: "?b" }],
  obj: {
    test: "?b",
  },
});

yo[FETCH_PARSE].then((v) => {
  console.warn(v);
});

yo.test.sub((v) => {
  console.warn(v);
});

yo.then.sub((v) => {
  console.warn(v);
});

// yo.obj[FETCH_PARSE].then((v) => {
//   console.warn(v);
// });

// yo.obj.test.then((v) => {
//   console.warn(v);
// });

// yo.arr_fixed[1][FETCH_PARSE].then((v) => {
//   console.warn(v);
// });

// yo.arr_fixed_obj[1].test.then((v) => {
//   console.warn(v);
// });

// const subs: StateSub<any>[] = [];
// yo.arr_dyn.sub((v) => {
//   console.warn(v);
//   if (v.err) return;
//   state.a.read(v.value).forEach((arr) => {
//     console.warn(arr);
//     switch (arr.type) {
//       case "added":
//         arr.items.forEach((item, i) => {
//           console.warn(item);
//           subs[i] = item.sub((v) => {
//             console.warn(v);
//           });
//         });
//         break;
//       case "removed":
//         arr.items.forEach((item, i) => {
//           console.warn(item);
//           item.unsub(subs[i]);
//         });
//         break;
//     }
//   });
// });

// const subs2: StateSub<any>[] = [];
// yo.arr_dyn_obj.sub((v) => {
//   console.warn(v);
//   if (v.err) return;
//   state.a.read(v.value).forEach((arr) => {
//     console.warn(arr);
//     switch (arr.type) {
//       case "added":
//         arr.items.forEach((item, i) => {
//           console.warn(item);
//           item.test.then((v) => {
//             console.warn(v);
//           });
//           item[FETCH_PARSE].then((v) => {
//             console.warn(v);
//           });
//         });
//         break;
//       case "removed":
//         arr.items.forEach((item, i) => {
//           console.warn(item);
//           item.test.unsub(subs2[i]);
//         });
//         break;
//     }
//   });
// });
