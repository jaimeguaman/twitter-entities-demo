var tweets = {
	'contenedor' : '',
	'callback':null,
	'get' : function(contenedor,callback) {
		this.contenedor = contenedor;
		this.callback=callback;
		$.getJSON('../../social2.php?r=twitter&m=publicaciones&u=BestEarthPix&s=tweets&n=30', tweets.procesaTweet);
	},
	'procesaTweet' : function(datos) {
		$.each(datos, function(t, tweet) {
			//	console.log (tweet);
			if (tweet.entities && tweet.entities.media) {
				tweets.agregaFoto(tweet.entities.media[0].media_url, tweet.text, tweet.id);
			}
			if (t == datos.length - 1) {
				$(tweets.contenedor).imagesLoaded(function() {
					$('#cargando').fadeOut('slow',function(){
						if (typeof tweets.callback === 'function') tweets.callback();
						$('#fin').fadeIn('slow');
					});

					var $container = $(tweets.contenedor);
					$container.masonry({
					  itemSelector: '.foto'
					});

				});

			}
		});
	},
	'agregaFoto' : function(url, descripcion, id) {
		var markup = null;
		var descripcionSinUrl = descripcion.substring(0, descripcion.length - 22);
		var descripcionUrl = descripcion.substring(descripcion.length - 20);
		markup = '<div id="foto-' + id + '" class="foto grid-5">';
		markup += '<a href="' + descripcionUrl + '">' + descripcionSinUrl + '</a>';
		markup += '<img onclick="detalleFoto(\'' + url + ':large\')" src="' + url + '" alt="esto-es-una-foto" title="Click para agrandar" />';
		markup += '</div>';
		$(tweets.contenedor).append(markup);
	}
}
