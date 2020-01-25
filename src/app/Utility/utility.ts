export class Utility {

    // Check if a string value is empty
    checkIsEmpty(pValue: string): boolean {
        return pValue === '' ? true : false;
    }

    // Check if any value is null
    checkIsNull(pValue: any): boolean {
        return pValue == null ? true : false;
    }

}
