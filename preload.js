
window.addEventListener('DOMContentLoaded', () => {
	const Loris = require('@anzerr/slowloris.tool');
// 	const SocksProxyAgent= require('socks-proxy-agent');
// const agent = new SocksProxyAgent('socks5h://localhost:9050');
	const axios = require("axios")

	
	axios({
		url: 'http://api.ipify.org',
		method: "GET"

	}).then((result) => {
		const ip = result?.data || "0.0.0.0"
		window.ip = ip
		showResults([`Seu ip atual: ${ip}`])
	})


	window.axios = axios;
	window.Slowloris = Loris;
	window.url = "https://api.hackertarget.com/httpheaders/?q=";
})
