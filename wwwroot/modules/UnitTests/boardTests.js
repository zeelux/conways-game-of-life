/// <reference path="../../Scripts/jasmine.js" />
/// <reference path="../../Scripts/jquery-2.0.3.js" />
/// <reference path="../../Scripts/knockout-2.3.0.debug.js" />
/// <reference path="../../Scripts/require.js" />
/// <reference path="../../Scripts/underscore.js" />

define(function (require) {
    'use strict';

    var _ = require('underscore'),
        Board = require('board');

    require('jasmine');

    var cells = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    describe('Unit Tests', function () {
        describe('Game Board', function () {
            var board = null;

            beforeEach(function () {
                
            });
            afterEach(function () {
                board.destroy();
            });

            describe('ctor', function () {
                it('sets current generation to 0', function () {
                    board = new Board({preventRendering: true});
                    expect(board.generation()).toBe(0);
                });
                
                it('sets default board size of 100x100', function () {
                    board = new Board({preventRendering: true});
                    expect(board.width).toBe(100);
                    expect(board.height).toBe(100);
                });

                it('accepts a custom height', function () {
                    board = new Board({ height: 500, preventRendering: true });
                    expect(board.height).toBe(500);
                });

                it('accepts a custom width', function () {
                    board = new Board({ width: 1000, preventRendering: true });
                    expect(board.width).toBe(1000);
                });

                it('accepts custom height and width', function () {
                    board = new Board({ height: 500, width: 1000, preventRendering: true });
                    expect(board.height).toBe(500);
                    expect(board.width).toBe(1000);
                });

                it('sets height to 10 if passed in value is less than 10', function () {
                    board = new Board({ height: 5, preventRendering: true });
                    expect(board.height).toBe(10);
                });

                it('sets width to 10 if passed in value is less than 10', function () {
                    board = new Board({ width: 5, preventRendering: true });
                    expect(board.width).toBe(10);
                });

                it('sets height to 768 if passed in value is greater than 768', function () {
                    board = new Board({ height: 10000, preventRendering: true });
                    expect(board.height).toBe(768);
                });

                it('sets width to 1024 if passed in value is greater than 1024', function () {
                    board = new Board({ width: 10000, preventRendering: true });
                    expect(board.width).toBe(1024);
                });

                it('creates a grid with the default dimensions', function () {
                    board = new Board({preventRendering: true});
                    expect(board.grid.length).toBe(100);
                    expect(board.grid[0].length).toBe(100);
                    expect(board.grid[50].length).toBe(100);
                    expect(board.grid[99].length).toBe(100);
                });

                it('creates a grid with custom (200 x 300) dimensions', function () {
                    board = new Board({ height: 200, width: 300, preventRendering: true });
                    expect(board.grid.length).toBe(200);
                    expect(board.grid[0].length).toBe(300);
                    expect(board.grid[50].length).toBe(300);
                    expect(board.grid[99].length).toBe(300);
                    expect(board.grid[150].length).toBe(300);
                    expect(board.grid[199].length).toBe(300);
                });

                it('creates a grid with custom (300 x 200) dimensions', function () {
                    board = new Board({ height: 300, width: 200, preventRendering: true });
                    expect(board.grid.length).toBe(300);
                    expect(board.grid[0].length).toBe(200);
                    expect(board.grid[50].length).toBe(200);
                    expect(board.grid[99].length).toBe(200);
                    expect(board.grid[150].length).toBe(200);
                    expect(board.grid[199].length).toBe(200);
                    expect(board.grid[250].length).toBe(200);
                    expect(board.grid[299].length).toBe(200);
                });

                it('accepts an initial state of cells', function () {
                    board = new Board({
                        preventRendering: true,
                        cells: cells
                        //cells: [
                        //    '..........',
                        //    '......***.',
                        //    '....*.....',
                        //    '....*.....',
                        //    '....**....',
                        //    '.....*....',
                        //    '......*...',
                        //    '...*......',
                        //    '..........',
                        //    '..........'
                        //]
                    });
                    expect(board.width).toBe(10);
                    expect(board.height).toBe(10);
                });

                it('creates a grid with the default dimensions when an empty cell array is passed in', function () {
                    board = new Board({ cells: [], preventRendering: true });
                    expect(board.width).toBe(100);
                    expect(board.height).toBe(100);
                });

                it('create living cells according to the 1s in the passed in grid', function () {
                    board = new Board({ cells: cells, preventRendering: true });
                    expect(board.grid[3][4]).toBe(1);
                    expect(board.grid[8][2]).toBe(1);
                    expect(board.grid[5][5]).toBe(1);
                    expect(board.grid[7][6]).toBe(1);
                });

                it('create dead cells according to the 0s in the passed in grid', function () {
                    board = new Board({ cells: cells, preventRendering: true });
                    expect(board.grid[1][4]).toBe(0);
                    expect(board.grid[2][8]).toBe(0);
                    expect(board.grid[5][6]).toBe(0);
                    expect(board.grid[9][5]).toBe(0);
                });

                it('create all dead cells when passing in height and width', function () {
                    board = new Board({ height: 10, width: 10, preventRendering: true });
                    expect(board.grid[1][4]).toBe(0);
                    expect(board.grid[2][8]).toBe(0);
                    expect(board.grid[5][6]).toBe(0);
                    expect(board.grid[9][5]).toBe(0);
                });

                it('activate cells according to the passed ratio of .2', function () {
                    var ratio = 0.2,
                        gridHeight = 10,
                        gridWidth = 10,
                        sum = 0;

                    board = new Board({ height: gridHeight, width: gridWidth, ratio: ratio, preventRendering: true });

                    sum = _(board.grid)
                        .flatten()
                        .reduce(function (sum, x) {
                            return sum += x;
                        }, 0);

                    expect(sum).toBe(ratio * gridHeight * gridWidth);
                });

                it('activate cells in a random order according to the passed ratio of .2', function () {
                    var ratio = 0.2,
                        gridHeight = 10,
                        gridWidth = 10;

                    board = new Board({ height: gridHeight, width: gridWidth, ratio: ratio, preventRendering: true });
                    var board2 = new Board({ height: gridHeight, width: gridWidth, ratio: ratio });

                    expect(_.isEqual(board.grid, board2.grid)).toBe(false);
                });

                it('activate grid without a ratio and have a dead board', function () {
                    var ratio = 0.0,
                        gridHeight = 10,
                        gridWidth = 10,
                        sum = 0;

                    board = new Board({ height: gridHeight, width: gridWidth, preventRendering: true });

                    sum = _(board.grid)
                        .flatten()
                        .reduce(function (sum, x) {
                            return sum += x;
                        }, 0);

                    expect(sum).toBe(ratio * gridHeight * gridWidth);
                });

                it('activate cells according to the passed ratio of .333', function () {
                    var ratio = 1 / 3,
                        gridHeight = 10,
                        gridWidth = 10,
                        sum = 0;

                    board = new Board({ height: gridHeight, width: gridWidth, ratio: ratio, preventRendering: true });

                    sum = _(board.grid)
                        .flatten()
                        .reduce(function (sum, x) {
                            return sum += x;
                        }, 0);

                    expect(sum).toBe(33);
                });
                it('activates 14 cells according to the passed ratio of .14812 with height 10 and width 10', function () {
                    var ratio = .14812,
                        gridHeight = 10,
                        gridWidth = 10,
                        sum = 0;

                    board = new Board({ height: gridHeight, width: gridWidth, ratio: ratio, preventRendering: true });

                    sum = _(board.grid)
                        .flatten()
                        .reduce(function (sum, x) {
                            return sum += x;
                        }, 0);

                    expect(sum).toBe(14);
                });
            });

            describe('Tick', function () {
                it('increments current generation', function () {
                    board = new Board({preventRendering: true});
                    board.tick();
                    expect(board.generation()).toBe(1);

                    board.tick();
                    expect(board.generation()).toBe(2);
                });

                describe('Any live cell with fewer than two live neighbours dies, as if caused by under-population.', function () {
                    it('kills live cell with no live neighbours', function () {
                        var cells = [
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                    
                        board.tick();
                        var sum = board.count();
                        expect(sum).toBe(0);
                    });

                   it('kills live cell with one live neighbour', function () {
                        var cells = [
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                        board.tick();
                        var sum = board.count();
                        expect(sum).toBe(0);
                   });

                   it('kills left top live corner cell with one live neighbour', function () {
                       var cells = [
                             [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                       ];
                       board = new Board({ cells: cells, preventRendering: true });
                       board.tick();
                       var sum = board.count();
                       expect(sum).toBe(0);
                   });

                   it('kills right top live corner cell with one live neighbour', function () {
                       var cells = [
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                             [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                       ];
                       board = new Board({ cells: cells, preventRendering: true });
                       board.tick();
                       var sum = board.count();
                       expect(sum).toBe(0);
                   });

                   it('kills left bottom live corner cell with one live neighbour', function () {
                       var cells = [
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
                       ];
                       board = new Board({ cells: cells, preventRendering: true });
                       board.tick();
                       var sum = board.count();
                       expect(sum).toBe(0);
                   });

                   it('kills right bottom live corner cell with one live neighbour', function () {
                       var cells = [
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                             [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
                       ];
                       board = new Board({ cells: cells, preventRendering: true });
                       board.tick();
                       var sum = board.count();
                       expect(sum).toBe(0);
                   });
                   
                  
                });

                describe('Any live cell with 2 or 3 live neighbours lives.', function () {
                    it('keeps live cell with two live neighbours', function () {
                        var cells = [
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });

                        board.tick();
                        
                        expect(board.grid[4][4]).toBe(1);
                    });

                    it('keeps live cell with three live neighbour', function () {
                        var cells = [
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                              [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                        board.tick();
                        
                        expect(board.grid[3][4]).toBe(1);
                    });

                    it('keeps left top live corner cell with two live neighbour', function () {
                        var cells = [
                              [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                        board.tick();
                        
                        expect(board.grid[0][0]).toBe(1);
                    });

                    it('keeps right top live corner cell with two live neighbour', function () {
                        var cells = [
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                              [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                        board.tick();
                        
                        expect(board.grid[0][9]).toBe(1);
                    });

                    it('keeps left bottom live corner cell with two live neighbour', function () {
                        var cells = [
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                              [1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                        board.tick();

                        expect(board.grid[9][0]).toBe(1);
                    });

                    it('keeps right bottom live corner cell with two live neighbour', function () {
                        var cells = [
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                              [0, 0, 0, 0, 0, 0, 0, 0, 1, 1]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                        board.tick();
                        
                        expect(board.grid[9][9]).toBe(1);
                    });


                });

                describe('Any live cell with more than three live neighbours dies, as if by overcrowding.', function () {
                    it('kills cell with more than three live neighbours', function () {
                        var cells = [
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                               [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
                               [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });

                        board.tick();
                        var sum = board.count();
                        
                        expect(board.grid[4][4]).toBe(0);
                    });

                    it('kills corner cell with more than 3 live neighbours', function () {
                        var cells = [
                              [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                              [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                        board.tick();
                        
                        expect(board.grid[0][1]).toBe(0);
                    });

                    xit('keeps right top live corner cell with two live neighbour', function () {
                        var cells = [
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                              [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                        board.tick();
                        var sum = board.count();
                        expect(sum).toBe(3);
                    });

                    xit('keeps left bottom live corner cell with two live neighbour', function () {
                        var cells = [
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                              [1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                        board.tick();
                        var sum = board.count();
                        expect(sum).toBe(3);
                    });

                    xit('keeps right bottom live corner cell with two live neighbour', function () {
                        var cells = [
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                              [0, 0, 0, 0, 0, 0, 0, 0, 1, 1]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                        board.tick();
                        var sum = board.count();
                        expect(sum).toBe(3);
                    });


                });

                describe('Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', function () {
                    it('makes cell alive with three live neighbours', function () {
                        var cells = [
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
                               [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });

                        board.tick();
                        var sum = board.count();
                        
                        expect(board.grid[4][4]).toBe(1);
                    });

                    it('keeps live cell with three live neighbour', function () {
                        var cells = [
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                              [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                        board.tick();
                        expect(board.grid[3][4]).toBe(1);
                    });

                    it('keeps left top live corner cell with two live neighbour', function () {
                        var cells = [
                              [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                        board.tick();
                        expect(board.grid[0][0]).toBe(1);
                        expect(board.grid[0][1]).toBe(1);
                        expect(board.grid[1][0]).toBe(1);
                        expect(board.grid[1][1]).toBe(1);
                    });

                    it('keeps right top live corner cell with two live neighbour', function () {
                        var cells = [
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                              [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                        board.tick();
                        expect(board.grid[0][9]).toBe(1);
                        expect(board.grid[1][9]).toBe(1);
                        expect(board.grid[0][8]).toBe(1);
                        expect(board.grid[1][8]).toBe(1);
                    });

                    it('keeps left bottom live corner cell with two live neighbour', function () {
                        var cells = [
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                              [1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                        board.tick();
                        expect(board.grid[9][0]).toBe(1);
                        expect(board.grid[8][0]).toBe(1);
                        expect(board.grid[9][1]).toBe(1);
                        expect(board.grid[8][1]).toBe(1);
                    });

                    it('keeps right bottom live corner cell with two live neighbour', function () {
                        var cells = [
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                              [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                              [0, 0, 0, 0, 0, 0, 0, 0, 1, 1]
                        ];
                        board = new Board({ cells: cells, preventRendering: true });
                        board.tick();
                        expect(board.grid[9][9]).toBe(1);
                        expect(board.grid[9][8]).toBe(1);
                        expect(board.grid[8][8]).toBe(1);
                        expect(board.grid[8][9]).toBe(1);
                    });


                });               
            });

            // This test breaks the suite for some reason. Haven't looked into it yet.
            // describe('Step Generation', function () {
            //     it('runs specified number of generations', function () {
            //         runs(function () {
            //             board.runGenerations(20);
            //         });
                    
            //         waitsFor(function () {
            //             return (board.generation >= 20);
            //         }, "The generations should be run", 750);

            //         runs(function () {
            //             expect(board.generation).toBe(20);
            //         });
                    
            //     });                
            // });
        });
    });
});