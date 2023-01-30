// import { DecoratorFunction } from '@storybook/types';
// import * as fonts from '../lib/fonts';
// import React from 'react';

import 'styles/globals.css';

// export const decorators: DecoratorFunction[] = [
// 	(Story, options) => (
// 		<div
// 			className={`${fonts.merienda.variable} ${fonts.playfair.variable}`}
// 		>
// 			<Story {...options} />
// 		</div>
// 	),
// ];

export const parameters = {
	nextjs: {
		router: {
			push() {},
		},
	},
};
