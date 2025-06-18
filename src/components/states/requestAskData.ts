/* eslint-disable @typescript-eslint/no-explicit-any */

const stateObjectos: any = {};

const updateState = () => {
    for (const s in stateObjectos) {
        stateObjectos[s]();
    }
}

export let requestAskDataObject = {};

export const setRequestAskDataAddState = (newData: any) => {
    requestAskDataObject = { ...newData };
    updateState();
}

export const requestAskDataAddState = (key: string, state: any) => {
    stateObjectos[key] = state;
}
