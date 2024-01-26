let text = `The lord is my shephard, I shall not want. He leadeth me beside the still waters`;

fetch(
	`https://api.mymemory.translated.net/get?user=34854f247e3138f2e2f2&langpair=en|tr&q=${text}`
)
	.then((res) => res.json())
	.then((data) => console.log(data.responseData.translatedText));
