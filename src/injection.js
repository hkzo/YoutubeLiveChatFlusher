// @ts-nocheck
/** biome-ignore-all lint/complexity/useLiteralKeys: For recognize youtube data object */
(() => {
	const ev = () => new CustomEvent('ytlcf-message', {
		detail: {
			ytInitialData: JSON.stringify(window['ytInitialData']),
			ytcfg: JSON.stringify(window['ytcfg']?.d()),
		},
	});
	let tries = 0;
	const dispatch = () => {
		if (!window['ytInitialData']) {
			console.warn(`[ytlcf] Failed to get ytInitialData, retrying... ${++tries}`);
			setTimeout(dispatch, 500);
			return;
		}
		console.debug(`[ytlcf] Successfully got ytInitialData, playerOverlays: ${'playerOverlays' in window['ytInitialData']}`);
		if ('playerOverlays' in window['ytInitialData']) {
			const timer = setInterval(() => {
				if (document.querySelector('#movie_player video')) {
					clearInterval(timer);
					self.dispatchEvent(ev());
				}
			}, 1000);
		} else {
			self.dispatchEvent(ev());
		}
	};
	if (document.visibilityState === 'visible') dispatch();
	else document.addEventListener('visibilitychange', dispatch, { once: true, passive: true });
})();
