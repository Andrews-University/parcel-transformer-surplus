Object.defineProperty(exports, "__esModule", {
	value: true
});

const {Transformer} = require("@parcel/plugin");
const DepsRegex = require('deps-regex');
const {default: SourceMap} = require("@parcel/source-map");
const compiler = require('surplus/compiler');
const {relativePath} = require('@parcel/utils');

const re = new DepsRegex({
	matchInternal: true,
	matchES6: true
});
const isUsingSurplus = contents => re.getDependencies(contents).find(d => d === 'surplus')

exports.default = new Transformer({
	async transform({asset, config, logger, resolve, options}) {
		const code = await asset.getCode();

		if(!isUsingSurplus(code)) return [asset];

		const {src, map} = compiler.compile(code, {
			sourcemap: 'extract',
			sourcefile: relativePath(options.projectRoot, asset.filePath)
		});

		const sourceMap = await asset.getMap();
		return [{
			type: "js",
			content: src,
			map: sourceMap ? new SourceMap().extends(sourceMap, map) : new SourceMap().addVLQMap(map)
		}];
	},
});
