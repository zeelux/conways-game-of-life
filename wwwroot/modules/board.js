/// <reference path="../Scripts/jquery-2.0.3.js" />
/// <reference path="../Scripts/jquery-ui-1.10.3.js" />
/// <reference path="../Scripts/knockout-2.3.0.debug.js" />
/// <reference path="../Scripts/underscore.js" />

/*global define: true */

define(function (require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        ko = require('knockout'),
        //d3 = require('d3');
        Kinetic = require('kinetic');

    function Board(options) {
        this.generation = ko.observable();
        this.gameBoardElement = $('div.gameboard').get(0);

        this.options = options || {};
        this.init();

        //ko.track(this, ['generation']);
    }

    Board.prototype.init = function () {
        this.generation(0);

        if (this.options.cells && this.options.cells.length) {
            this.height = this.options.cells.length;
            this.width = this.options.cells[0].length;
            this.grid = this.options.cells;
        } else {
            this.height = Math.min(Math.max(this.options.height || 100, 10), 768);
            this.width = Math.min(Math.max(this.options.width || 100, 10), 1024);
            this.grid = createGrid(this.height, this.width, this.options.ratio || 0);
        }

        this.initKinetic();
        this.updateKinetic();
    };

    function createGrid(height, width, ratio) {
        ratio = ratio || 0;

        var gridList = _(_(height * width).times(function (n) {
            return (n < Math.floor(height * width * ratio)) ? 1 : 0;
        })).shuffle();

        return _(height).times(function (n) {
            return gridList.splice(0, width);
        });
    }

    Board.prototype.count = function () {
        var self = this;
        return _(self.grid)
                .flatten()
                .reduce(function (sum, x) {
                    return sum + x;
                }, 0);
    };

    Board.prototype.tick = function () {
        var self = this,
            i,
            j,
            sum,
            targetGrid = [];

        for (i = 0; i < self.height; i++) {
            targetGrid.push([]);
            for (j = 0; j < self.width; j++) {
                targetGrid[i].push(0);
            }
        }

        for (i = 0; i < self.height; i++) {
            for (j = 0; j < self.width; j++) {
                sum = getValue(self.grid, i - 1, j - 1) +
                    getValue(self.grid, i - 1, j) +
                    getValue(self.grid, i - 1, j + 1) +
                    getValue(self.grid, i, j - 1) +
                    getValue(self.grid, i, j + 1) +
                    getValue(self.grid, i + 1, j - 1) +
                    getValue(self.grid, i + 1, j) +
                    getValue(self.grid, i + 1, j + 1);

                if (sum >= 2 && sum <= 3) {
                    targetGrid[i][j] = self.grid[i][j] === 1 ? 1 : 0;
                }

                if (sum === 3 && (self.grid[i][j] === 0)) {
                    targetGrid[i][j] = 1;
                }
            }
        }
        self.grid = targetGrid;

        self.generation(self.generation() + 1);

        this.updateKinetic();
    };

    function delayedTick(self, count, executions) {
        if (executions >= count) {
            return;
        }

        requestAnimationFrame(function () {
            delayedTick(self, count, executions + 1);
        }, self.gameBoardElement);

        self.tick();
    }

    Board.prototype.runGenerations = function (count) {
        var self = this;
        delayedTick(self, count, 0);
    };

    Board.prototype.run10Generations = function () {
        this.runGenerations(10);
    };

    Board.prototype.run100Generations = function () {
        this.runGenerations(100);
    };

    Board.prototype.run1000Generations = function () {
        this.runGenerations(1000);
    };

    Board.prototype.reset = function () {
        this.init();
    };

    Board.prototype.initKinetic = function () {
        var self = this,
            cellSize = 5,
            cellPadding = 2;

        //$('div.gameboard').empty();

        if (!self.stage) {
            self.stage = new Kinetic.Stage({
                container: $('div.gameboard')[0],
                width: self.width * (cellSize + cellPadding),
                height: self.height * (cellSize + cellPadding)
            });

            self.cellLayer = new Kinetic.Layer({});

            self.cells = [];
            _.times(self.height, function (row) {
                var rowData;

                rowData = _.times(self.width, function (col) {
                    var cell = new Kinetic.Rect({
                        width: cellSize,
                        height: cellSize,
                        fill: '#2d578b',
                        x: row * (cellSize + cellPadding),
                        y: col * (cellSize + cellPadding),
                        visible: self.grid[row][col]
                    });

                    self.cellLayer.add(cell);

                    return cell;
                });

                self.cells.push(rowData);
            });

            self.stage.add(self.cellLayer);
        }
    };

    Board.prototype.updateKinetic = function () {
        var self = this,
            row, col, cell, newVisibility;

        for (row = 0; row < self.height; row++) {
            for (col = 0; col < self.width; col++) {
                cell = self.cells[row][col];
                newVisibility = self.grid[row][col];

                if (cell.getVisible() !== newVisibility) {
                    cell.setVisible(newVisibility);
                }
            }
        }

        self.stage.drawScene();
    };

    //Returns the value of the grid at position x,y

    function getValue(grid, y, x) {
        if (y < 0 || x < 0) {
            return 0;
        }

        if (y >= grid.length) {
            return 0;
        }

        if (x >= grid[0].length)
            return 0;
        else
            return grid[y][x];
    }

    return Board;
});