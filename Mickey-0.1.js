/* بسم الله الرحمن الرحیم
 * 
 * Mickey v0.1
 * LICENSE: MIT 
 * 
 * 
 */


Mickey = function( el ) {
	
	if( typeof el == 'string' ) return new Mickey.fn( document.querySelectorAll( el ) );
	
	el = el || document.body;
	
	return new Mickey.fn( [el] )
		
}

Mickey.forEach = function( target, fn ) {
  
  for( var i = 0, len = target.length; i < len; i++ ) {
    
    fn( target[i] );
    
  }
  
}


/* OPTIONS AVAILABLE:
 * blink :: cursor blinks with a delay
 * chase :: scrolls follow the mouse
 * timeout :: changing cursor after a delay
 * interval :: changing cursor after a delay ( repeated )
 * shadow :: adds shadow to your mouse
 * text :: adds a text following your mouse
 */


Mickey.fn = function( el ) {
	
	this.el = el;

}



Mickey.fn.prototype = {
	
	chase : function() {
   
   

	 Mickey.forEach( this.el, function( target ) {
			
     target.addEventListener('mousemove', function( e ) {
  			
  			var
  			  top = Mickey.top,
  				left = Mickey.left,
  				topScrl = window.scrollY,
  				leftScrl = window.scrollX,
  				offsetWidth = target.offsetWidth,
  				offsetHeight = target.offsetHeight;
  			
  			window.scroll( ( left - leftScrl ) * ( offsetWidth / 700 ), ( top -  topScrl ) * ( offsetHeight / 700 ) ); // Works on almost every size, tested up to 40000px height & width
  						
  		});
  		
		});
		
		return new Mickey.fn( this.el )
	},
	
	blink : function( delay, cursor ) {
		
		
		
		Mickey.forEach( this.el, function(target) {
		  
			var turn = 0;
			
  		setInterval(function() {
  		  
  			if( turn == 0 ) {
  			  
  				target.style.cursor = 'none',
  				turn = 1;
  				
  			}
  			else {
  			  
  				target.style.cursor = cursor || 'default',
  				turn = 0;
  				
  			}
  		}, delay || 300);
  		
		});
		
		return new Mickey.fn( this.el )
	},
	
	timeout : function( cursor, delay, ret ) {
	 
	 
	 
    Mickey.forEach( this.el, function( target ) {
      
      var shift  = target.style.cursor;
      
      setTimeout(function() {
        
        target.style.cursor = cursor || 'pointer';
        
        if( ret ) setTimeout(function(){
          
            if( typeof ret == 'string' ) target.style.cursor = ret;
            
            else target.style.cursor = shift;
            
            }, delay)
        
      }, delay || 300);
      
    });
    
    return new Mickey.fn( this.el )
  },
	
	
	interval : function( from, to, delay ) { // Has same structure as blink
	  
	  
	  
    Mickey.forEach( this.el, function( target ) {
      
      turn = 0;
      
      setInterval(function() {
        
        if( turn == 0 ) {
          
          target.style.cursor = from,
          turn = 1;
          
        }
        else {
          
          target.style.cursor = to,
          turn = 0;
          
        }
        
      }, delay || 300);
      
    });
    
    return new Mickey.fn( this.el );
  },
	

//FIXME: If `x` and / or `y` are less than 0, clickable parts cannot be clicked ( canvas overlays them )
//TODO: We need a way to detect user's mouse model, user's mouse might be ANYTHING, so we need a way to draw the cursor's shadow depending on user's cursor
//TODO: Shadow's blur, because of canvas' limited height and width we can't do that correctly

	shadow : function( x, y, color, delay, className ) {
	  
	  Mickey.forEach( this.el, function( target ) {
	    
  	  var shadow = document.createElement('canvas'),
  	      canvas = shadow.getContext('2d'),
  	      mouse  = target.style.cursor.style;
  	      
  	  
  	  shadow.setAttribute('width','14'),
  	  shadow.setAttribute('height','21');
  	  shadow.style.position = 'absolute';
  	  shadow.style.display = 'none';
  	  if( className ) txt.className = className;
  	  
  	  canvas.fillStyle = color || 'black';
  	  
  	  switch (mouse) {
  	    
  	    default: // Ubuntu's default cursor, similar to Win7's cursor
  	      canvas.moveTo( 0, 0);
          canvas.lineTo( 13.5, 14);
          canvas.lineTo( 8, 14.5);
          canvas.lineTo( 10, 20);
          canvas.lineTo( 8, 20.5);
          canvas.lineTo( 5, 15.5);
          canvas.lineTo( 0, 18.5);
          canvas.lineTo( 0, 0);
          canvas.fill();
          break;
  	    
  	  }
  
  
      target.appendChild( shadow );
      
  	  target.addEventListener('mousemove', function( e ) {
  	    
  	    shadow.style.display='block';
  	    
  	    setTimeout( function() {
  	       
    	    x = x || 0,
    	    y = y || 0;
    	    
    	    shadow.style.top      = Mickey.top + x + 1 + 'px';
    	    shadow.style.left     = Mickey.left + x + 1 + 'px';
  	    
  	    }, delay || 0)
  	    
  	  });
  	  
  	  target.addEventListener('mouseleave', function() {
        
        shadow.style.display='none';
        
      });

    });
    
	  return new Mickey.fn( this.el )	  
	},
	
	
	hover : function( fn ) {
	  
	  Mickey.forEach( this.el, function( target ) {

	    target.addEventListener('mouseover', fn );

    });
    
	  return new Mickey.fn( this.el )
	},
	
	click : function( fn ) {
  
	  Mickey.forEach( this.el, function( target ) {

	    target.addEventListener('click', fn );
	    
	  });
	  
	  return new Mickey.fn( this.el )
	},
	
	text : function( text, styles, x, y, effect, className ) {
	  
	  var txt = document.createElement('span');
	  
	  txt.innerHTML = text;
	  txt.style.position = 'absolute';
	  txt.style.display = 'none';
	  txt.className = 'mickey-text';
	  if( className ) txt.className = className;
	  
	  if( styles ) {
  	  for( var i in styles ) {

  	    txt.style[i] = styles[i];
  	    
  	  }
	  }
	  
	  var x = x || 0,
        y = y || 0;
	  
	  switch( effect ) {
    
        case 'heart-beat':
        
  
        i = 14 || styles.fontSize;
        turn = 0;
        setInterval( function() {
          
          if( turn == 0 && i < 25 ) {
            txt.innerHTML = '<span style="font-size:' + i + 'px">' + text + '</span>';
            i++;
          }
          if( i == 25 ) turn = 1;
          
          if( turn == 1 && i > 14 ){
            i--;
            txt.innerHTML = '<span style="font-size:' + i + 'px">' + text + '</span>';
          }
          
          if( i == 14 ) turn = 0;
          
          
        }, 30 );
        
     }
	  
	  
	  Mickey.forEach( this.el, function( target ) {

	    target.appendChild( txt );
	    
	    target.addEventListener('mousemove', function( e ) {

        txt.style.display = 'block';
	      txt.style.top = Mickey.top + 21 + y + 'px';
	      txt.style.left = Mickey.left + 14 + x + 'px';
	      
	    });
	    
	    target.addEventListener('mouseleave', function( e ) {
	      
	      txt.style.display = 'none';
	      
	    });
	    
	  });
	  
	  return new Mickey.fn( this.el );
	},
	
	image : function( src, styles, x, y, effect, className) {
	  
	  var 
	  img = document.createElement('img');
    img.setAttribute('src', src);
    img.style.position = 'absolute';
    img.style.display = 'none';
    img.className = 'mickey-image';
    if( className ) img.className = className;
    
    if( styles ) {
      for( var i in styles ) {

        img.style[i] = styles[i];
        
      }
    }
    var x = x || 0,
        y = y || 0;
        
    Mickey.forEach( this.el, function( target ) {

      target.appendChild( img )
   
      target.addEventListener('mousemove', function( e ) {
        
        img.style.display='block';
        img.style.top = Mickey.top + 21 + y + 'px';
        img.style.left = Mickey.left + 14 + x + 'px';
        
      });
      
       target.addEventListener('mouseleave', function( e ) {
        
        img.style.display='none';
        
      });
      
    });
    
    return new Mickey.fn( this.el );
  },
  
  absolute : function() {
    
    return { top : Mickey.top, left : Mickey.left };
    
  },
  
  relative : function() {
    
    var eTop = this.el[0].offsetTop,
        eLeft = this.el[0].offsetLeft;

    return { top : Mickey.top - eTop, left : Mickey.left - eLeft}
    
  }
	
}

document.body.addEventListener('mousemove', function( e ) {
  
  Mickey.top = e.pageY,
  Mickey.left = e.pageX;
  
})
