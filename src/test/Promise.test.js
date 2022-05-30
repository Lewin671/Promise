const Promise = require("../Promise");

test('executor function should be called', () => {
    let hasRun = false;
    new Promise((resolve, reject) => {
        hasRun = true;
    });

    expect(hasRun).toBe(true);
});


test('onFulfilled callback in then method should be called after resolved', () => {
    let resolvedHasRun = false;
    new Promise((resolve) => {
        resolve();
    }).then(() => {
        resolvedHasRun = true;
    });
    expect(resolvedHasRun).toBe(true);
})


test('onRejected callback in then method should not be called after resolved ', () => {
    let rejectedCallbackHasRun = false;
    new Promise((resolve) => {
        resolve();
    }).then(() => {
    }, () => {
        rejectedCallbackHasRun = true;
    });
    expect(rejectedCallbackHasRun).toBe(false);
})



