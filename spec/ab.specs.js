describe('AB.test', function () {

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

    it('should provide a test method', function () {
        // assert
        expect(typeof window.AB.test === "function").toBe(true);
    });

    describe('when running a test', function () {

        it('should ignore values one ten thousandth or less', function () {
            // arrange
            spyOn(Math, 'random').andReturn(0.0001);
            // act
            var result = AB.test(['a','b'], 1);
            // assert
            expect(result).toBeNull();
        });
        
        it('should allow values over one ten thousandth', function () {
            // arrange
            spyOn(Math, 'random').andReturn(0.00011);
            // act
            var result = AB.test(['a','b'], 1);
            // assert
            expect(result).not.toBeNull();
        });

        it('should not run tests over the frequency limit', function () {
            // arrange
            spyOn(Math, 'random').andReturn(0.0001);
            // act
            var result = AB.test(['a','b'], 0.001);
            // assert
            expect(result).toBeNull();
        });

        it('should run tests under the frequency limit', function () {
            // arrange
            spyOn(Math, 'random').andReturn(0.01);
            // act
            var result = AB.test(['a','b'], 0.001);
            // assert
            expect(result).toBeNull();
        });

        it('should try to create a cryptographically random number', function () {
            // arrange
            spyOn(Math, 'random').andReturn(0.1);
            spyOn(crypto, 'getRandomValues');
            // act
            var result = AB.test(['a','b'], 1);
            // assert
            expect(crypto.getRandomValues.callCount).toBe(1);
        });

        it('should fallback to Math.random on crypto error', function () {
            // arrange
            spyOn(Math, 'random').andReturn(0.1);
            spyOn(crypto, 'getRandomValues').andCallFake(function() {
              throw new Error('crypto fail!');
            });
            // act
            var result = AB.test(['a','b'], 1);
            // assert
            expect(Math.random.callCount).toBe(3);
        });

    });

});