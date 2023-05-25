"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMontshToUpdate = void 0;
const getMontshToUpdate = () => {
    const actualDate = new Date();
    const monthsToUpdate = new Array(actualDate.getMonth()).fill('a');
    return monthsToUpdate.map((_, index) => {
        const startDate = new Date();
        startDate.setMonth(index);
        startDate.setDate(1);
        const endDate = new Date();
        endDate.setMonth(index);
        endDate.setDate(31);
        return {
            startTimestamp: startDate.getTime(),
            endTimestamp: endDate.getTime(),
        };
    });
};
exports.getMontshToUpdate = getMontshToUpdate;
//# sourceMappingURL=time.js.map