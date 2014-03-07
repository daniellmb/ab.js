describe('AB.log', function () {

    beforeEach(function () {
        // set up
    });

    afterEach(function () {
        // tear down
    });

    it('should provide an AB namespace', function () {
        // assert
        expect(typeof window.AB === "object").toBe(true);
    });

    it('should provide a log method', function () {
        // assert
        expect(typeof window.AB.log === "function").toBe(true);
    });

    describe('when logging data', function () {

        it('should handle log urls that do not include "?"', function () {
            // arrange
            var img = {},
                url = "http://www.example.com";
            spyOn(document, 'createElement').andReturn(img);
            // act
            AB.log({foo:"bar"}, url);
            // assert
            expect(img.src).toBe(url+"?foo=bar");
        });

        it('should handle log urls that already include "?"', function () {
            // arrange
            var img = {},
                url = "http://www.example.com?a=b";
            spyOn(document, 'createElement').andReturn(img);
            // act
            AB.log({foo:"bar"}, url);
            // assert
            expect(img.src).toBe(url+"&foo=bar");
        });

        it('should convert JSON object to encoded query string params', function () {
            // arrange
            var img = {},
                url = "http://www.example.com";
            spyOn(document, 'createElement').andReturn(img);
            // act
            AB.log({foo:"a b"}, url);
            // assert
            expect(img.src).toBe(url+"?foo=a%20b");
        });

        it('should limit the url to the 2,000 characters max', function () {
            // arrange
            var img = {},
                url = "http://www.example.com",
                expected = url+"?foo="+new Array(1974).join('_');
            spyOn(document, 'createElement').andReturn(img);
            // act
            AB.log({foo:new Array(2000).join('_')}, url);
            // assert
            expect(img.src).toBe(expected);
            expect(expected.length).toBe(2000);
        });

        it('should create an image object', function () {
            // arrange
            var img = {},
                url = "http://www.example.com";
            spyOn(document, 'createElement').andReturn(img);
            // act
            AB.log({foo:"bar"}, url);
            // assert
            expect(document.createElement.callCount).toBe(1);
        });

        it('should assign optional callback', function () {
            // arrange
            var img = {},
                url = "http://www.example.com",
                callBack = function(){};
            spyOn(document, 'createElement').andReturn(img);
            // act
            AB.log({foo:"bar"}, url, callBack);
            // assert
            expect(img.onerror === callBack).toBe(true);
            expect(img.onload === callBack).toBe(true);
        });

        it('should set the image src to send the data', function () {
            // arrange
            // act
            // assert
        });

    });

});