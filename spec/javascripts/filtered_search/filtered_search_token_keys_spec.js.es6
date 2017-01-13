require('~/extensions/array');
require('~/filtered_search/filtered_search_token_keys');

(() => {
  describe('Filtered Search Token Keys', () => {
    describe('get', () => {
      let tokenKeys;

      beforeEach(() => {
        tokenKeys = gl.FilteredSearchTokenKeys.get();
      });

      it('should return tokenKeys', () => {
        expect(tokenKeys !== null).toBe(true);
      });

      it('should return tokenKeys as an array', () => {
        expect(tokenKeys instanceof Array).toBe(true);
      });
    });

    describe('getConditions', () => {
      let conditions;

      beforeEach(() => {
        conditions = gl.FilteredSearchTokenKeys.getConditions();
      });

      it('should return conditions', () => {
        expect(conditions !== null).toBe(true);
      });

      it('should return conditions as an array', () => {
        expect(conditions instanceof Array).toBe(true);
      });
    });

    describe('searchByKey', () => {
      it('should return null when key not found', () => {
        const tokenKey = gl.FilteredSearchTokenKeys.searchByKey('notakey');
        expect(tokenKey === null).toBe(true);
      });

      it('should return tokenKey when found by key', () => {
        const tokenKeys = gl.FilteredSearchTokenKeys.get();
        const result = gl.FilteredSearchTokenKeys.searchByKey(tokenKeys[0].key);
        expect(result).toEqual(tokenKeys[0]);
      });
    });

    describe('searchBySymbol', () => {
      it('should return null when symbol not found', () => {
        const tokenKey = gl.FilteredSearchTokenKeys.searchBySymbol('notasymbol');
        expect(tokenKey === null).toBe(true);
      });

      it('should return tokenKey when found by symbol', () => {
        const tokenKeys = gl.FilteredSearchTokenKeys.get();
        const result = gl.FilteredSearchTokenKeys.searchBySymbol(tokenKeys[0].symbol);
        expect(result).toEqual(tokenKeys[0]);
      });
    });

    describe('searchByKeyParam', () => {
      it('should return null when key param not found', () => {
        const tokenKey = gl.FilteredSearchTokenKeys.searchByKeyParam('notakeyparam');
        expect(tokenKey === null).toBe(true);
      });

      it('should return tokenKey when found by key param', () => {
        const tokenKeys = gl.FilteredSearchTokenKeys.get();
        const result = gl.FilteredSearchTokenKeys.searchByKeyParam(`${tokenKeys[0].key}_${tokenKeys[0].param}`);
        expect(result).toEqual(tokenKeys[0]);
      });
    });

    describe('searchByConditionUrl', () => {
      it('should return null when condition url not found', () => {
        const condition = gl.FilteredSearchTokenKeys.searchByConditionUrl(null);
        expect(condition === null).toBe(true);
      });

      it('should return condition when found by url', () => {
        const conditions = gl.FilteredSearchTokenKeys.getConditions();
        const result = gl.FilteredSearchTokenKeys.searchByConditionUrl(conditions[0].url);
        expect(result).toBe(conditions[0]);
      });
    });

    describe('searchByConditionKeyValue', () => {
      it('should return null when condition tokenKey and value not found', () => {
        const condition = gl.FilteredSearchTokenKeys.searchByConditionKeyValue(null, null);
        expect(condition === null).toBe(true);
      });

      it('should return condition when found by tokenKey and value', () => {
        const conditions = gl.FilteredSearchTokenKeys.getConditions();
        const result = gl.FilteredSearchTokenKeys
          .searchByConditionKeyValue(conditions[0].tokenKey, conditions[0].value);
        expect(result).toEqual(conditions[0]);
      });
    });
  });
})();
