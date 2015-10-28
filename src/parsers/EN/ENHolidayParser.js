/*
    
    
*/

var moment = require('moment');
var hollidayCalc = require('../../hollidayCalculator');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp(
        'new\\s*year((s{1}|s{1}\'|\\s*)\\s*day)|' + 
        'mlk\\s*day|halloween|(christ|x)mas|' +
        'armed\\s*force((s{1}|s{1}\'|\'s{1}|\\s*)\\s*day)|memorial\\s*day|' +
        'flag\\s*day|independence\\s*day|labor\\s*day|columbus(\'?\\s*day)|' +
        'thanksgiving|veteran((s{1}|s{1}\'|\'s{1}|\\s*)\\s*day)|' +
        'president((s{1}|s{1}\'|\'s{1}|\\s*)\\s*day)' +
        '(?=\\W|$)', 'i');

exports.Parser = function ENCasualDateParser(){
    
    Parser.call(this);
        
    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 
        
        var holliday;
        var index = match.index;
        var text = match[0];
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var refMoment = moment(ref);
        var startMoment = refMoment.clone();
        var lowerText = text.toLowerCase();

        if (lowerText == 'new years day' || lowerText == 'new years\' day') {
            result.start.imply('day', 1);
            result.start.imply('month', 1);
            result.start.imply('year', result.start.get('year') + 1);

        } else if (lowerText == 'mlk day') {
            holliday = hollidayCalc.calculateDay(0, 1, 3, 1);
            result.start.imply('day', holliday.date());
            result.start.imply('month', holliday.month() + 1);

        } else if(lowerText == 'president\'s day' || lowerText == 'presidents day' || lowerText == 'presidents\' day') {
            holliday = hollidayCalc.calculateDay(0, 2, 3, 1);
            result.start.imply('day', holliday.date());
            result.start.imply('month', holliday.month() + 1);

        } else if (lowerText == 'memorial day') {
            holliday = hollidayCalc.calculateDay(-1, 5, 1, 1);
            result.start.imply('day', holliday.date());
            result.start.imply('month', holliday.month() + 1);

        } else if (lowerText == 'armed forces day' || lowerText == 'armed forces\' day' || lowerText == 'armed force\'s day') {
            holliday = hollidayCalc.calculateDay(0, 5, 3, 6);
            result.start.imply('day', holliday.date());
            result.start.imply('month', holliday.month() + 1);

        } else if (lowerText == 'flag day') {
            result.start.imply('day', 14);
            result.start.imply('month', 6);

        } else if (lowerText == 'independence day') {
            result.start.imply('day', 4);
            result.start.imply('month', 7);

        } else if (lowerText == 'labor day') {
            holliday = hollidayCalc.calculateDay(0, 9, 1, 1);
            result.start.imply('day', holliday.date());
            result.start.imply('month', holliday.month() + 1);

        } else if (lowerText == 'columbus day' || lowerText == 'columbus\' day') {
            holliday = hollidayCalc.calculateDay(0, 10, 2, 1);
            result.start.imply('day', holliday.date());
            result.start.imply('month', holliday.month() + 1);

        } else if (lowerText == 'halloween') {
            result.start.imply('day', 31);
            result.start.imply('month', 10);

        } else if (lowerText == 'veterans day' || lowerText == 'veterans\' day' || lowerText == 'veteran\'s day') {
            result.start.imply('day', 11);
            result.start.imply('month', 11);

        } else if (lowerText == 'thanksgiving') {
            holliday = hollidayCalc.calculateDay(0, 11, 4, 4);
            result.start.imply('day', holliday.date());
            result.start.imply('month', holliday.month() + 1);

        } else if (lowerText == 'christmas' || lowerText == 'xmas') {
            result.start.imply('day', 25);
            result.start.imply('month', 12);        
        } 

        result.tags['ENHolidayParser'] = true;
        return result;
    }
}

