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


Mickey.fn = function( el, rm ) {
	
	this.el = el;
	if( rm ) this.rm = rm;

}

Mickey.effect = function( pro, effect, el ) {

  for( var x in Mickey.effects ) {
    
    if( x == pro ) {
      
      for( var y in Mickey.effects[x] ) {

        if( y == effect.name ) return Mickey.effects[x][y]( el, effect )
        
      }
      return
    }
    
  }
  
}


Mickey.fn.prototype = {
	
	chase : function() {
   
   var listeners = [];

	 Mickey.forEach( this.el, function( target ) {

		 var fn = function( e ) {
        
        var
          top = Mickey.top,
          left = Mickey.left,
          topScrl = window.scrollY,
          leftScrl = window.scrollX,
          offsetWidth = target.offsetWidth,
          offsetHeight = target.offsetHeight;
        
        window.scroll( ( left - leftScrl ) * ( offsetWidth / 700 ), ( top -  topScrl ) * ( offsetHeight / 700 ) ); // Works on almost every size, tested up to 40000px height & width
              
      }
     target.addEventListener('mousemove', fn);
  	 listeners.push({ type : 'mousemove', listener : fn });
  	
		});
		
		return new Mickey.fn( this.el , listeners )
	},
	
	blink : function( delay, cursor ) {
		
		var ids = [];
		
		Mickey.forEach( this.el, function(target) {
		  var turn = 0;
		  
  		var fn = function() {
  		  
  			if( turn == 0 ) {
  			  
  				target.style.cursor = 'none',
  				turn = 1;
  				
  			}
  			else {
  			  
  				target.style.cursor = cursor || 'default',
  				turn = 0;
  				
  			}
  			
  		}
  		
  		ids.push({ interval : true, id : setInterval( fn, delay || 300), target : target  });

		});
		
		return new Mickey.fn( this.el, ids)
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
	  
	  var ids = [];
	  
    Mickey.forEach( this.el, function( target ) {
      
      var turn = 0;
      
      var fn = function() {
        
        if( turn == 0 ) {
          
          target.style.cursor = from,
          turn = 1;
          
        }
        else {
          
          target.style.cursor = to,
          turn = 0;
          
        }

      };
      
      ids.push({ interval : true, id : setInterval( fn, delay || 300), target : target });

    });
    
    return new Mickey.fn( this.el, ids );
  },

	shadow : function( x, y, color, delay, effect, className ) {
	  
	  var elements = [];
	  
	  Mickey.forEach( this.el, function( target ) {
	    
  	  var shadow = document.createElement('canvas'),
  	      mouse  = target.style.cursor.style;
  	  
  	  shadow.setAttribute('width','14'),
  	  shadow.setAttribute('height','21');
  	  shadow.style.position = 'absolute';
  	  shadow.style.display = 'none';
  	  
  	  var s = shadow.cloneNode(),
  	      canvas = s.getContext('2d');
  	  
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
  
      
      target.appendChild( s );
      
  	  target.addEventListener('mousemove', function() {
  	    
  	    s.style.display='block';
  	    
  	    setTimeout( function() {
  	       
    	    x = x || 0,
    	    y = y || 0;
    	    
    	    s.style.top      = Mickey.top + x + 1 + 'px';
    	    s.style.left     = Mickey.left + x + 1 + 'px';
  	    
  	    }, delay || 0)
  	    
  	  });
  	  
  	  target.addEventListener('mouseleave', function() {
        
        s.style.display='none';
        
      });

      elements.push({ element : s });
      
    });
    
    if ( effect ) Mickey.effect( 'shadow', effect, elements );
    
	  return new Mickey.fn( this.el, elements )	  
	},
	
	text : function( text, styles, x, y, effect, className ) {
	  
	  var txt = document.createElement('span'),
	      elements = [];
	  
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
	  
	  Mickey.forEach( this.el, function( target ) {

	    var t = txt.cloneNode();
	    target.appendChild( t );
	    
	    target.addEventListener('mousemove', function( e ) {

        t.style.display = 'block';
	      t.style.top = Mickey.top + 21 + y + 'px';
	      t.style.left = Mickey.left + 14 + x + 'px';
	      
	    });
	    
	    target.addEventListener('mouseleave', function( e ) {
	      
	      t.style.display = 'none';
	      
	    });
 
	    elements.push({ element : t });
	    
	  });
	  
	  if ( effect ) Mickey.effect( 'text', effect, elements );
	  
	  return new Mickey.fn( this.el, elements );
	},
	
	image : function( src, styles, x, y, effect, className) {
	   
	  var img = document.createElement('img'),
	      elements = [];
	  
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

      var i = img.cloneNode();
      target.appendChild( i );
   
      target.addEventListener('mousemove', function( e ) {
        
        i.style.display='block';
        i.style.top = Mickey.top + 21 + y + 'px';
        i.style.left = Mickey.left + 14 + x + 'px';
        
      });
      
       target.addEventListener('mouseleave', function( e ) {
        
        i.style.display='none';
        
      });
      
      elements.push({ element : i });
      
    });
        
    if ( effect ) Mickey.effect( 'image', effect, elements );
    
    return new Mickey.fn( this.el, elements );
  },
  
  hover : function( fn ) {
    
    var listeners = [];
    
    Mickey.forEach( this.el, function( target ) {

      target.addEventListener('mouseover', fn );
      listeners.push({ type : 'mouseover', listener: fn });
  
    });
    
    return new Mickey.fn( this.el, listeners )
  },
  
  click : function( fn ) {
  
    var listeners = [];
  
    Mickey.forEach( this.el, function( target ) {

      target.addEventListener('click', fn );
      listeners.push({ type : 'click', listener: fn });
      
    });
    
    return new Mickey.fn( this.el, listeners )
  },
  
  absolute : function() {
    
    return { top : Mickey.top, left : Mickey.left };
    
  },
  
  relative : function() {
    
    var eTop = this.el[0].offsetTop,
        eLeft = this.el[0].offsetLeft;

    return { top : Mickey.top - eTop, left : Mickey.left - eLeft}
    
  },
  
  stop : function( obj ) {

    if( obj.rm[0].listener ) { 
      
      for( var i = 0, len = this.el.length; i < len; i++ ) {
        
        for( var x = 0, le = obj.rm.length; x < le; x++ ) {

            this.el[i].removeEventListener( obj.rm[x].type, obj.rm[x].listener )
          
        }
        
        
      }
      
    }
    
    if( obj.rm[0].interval ) {
      
      for( var x = 0, le = obj.rm.length; x < le; x++ ) {

        for( var i = 0, len = this.el.length; i < len; i++ ) {
          
          if( obj.rm[x].target == this.el[i] ) {
              
            window.clearInterval( obj.rm[x].id );
              
          }
            
        }
      
      }
      
    }
    
    if( obj.rm[0].element ) {
      
      for( var x = 0, le = this.el.length; x < le; x++ ) {
        
        for( var i = 0, len = obj.rm.length; i < len; i++ ) {
          
          for( var y = 0, l = this.el[x].childNodes.length; y < l; y++ ) {
            
            if( this.el[x].childNodes[y] == obj.rm[i].element ) {
              
              this.el[x].removeChild( obj.rm[i].element )
              
            }
            
          }

        }
        
      }
      
    }
    
  }
	
}



Mickey.effects = {
  
  shadow: {},
  text  : {},
  image : {}
  
};

Mickey.effects.text.heartbeat = function( els, opts ) {

   Mickey.forEach( els, function( el ) {

     var el = el.element,
         i = parseInt( el.style.fontSize ) || 14;
         turn = 0,
         opts = opts || {},
         min = opts.min || 0,
         max = opts.max || 0,
         speed = opts.speed || 0;
        
    setInterval( function() {
      
      if( turn == 0 && i < 25 + max ) {
        el.style.fontSize = i + 'px';
        i++;
      }
      if( i == 25 + max ) turn = 1;
        
      if( turn == 1 && i > 11 + min ) {
        el.style.fontSize = i + 'px';
        i--;
      }
            
      if( i == 11 + min ) turn = 0;
                     
    }, 30 + speed );
     
   });
      

};

Mickey.effects.image.spin = function( els, opts ) {
  
  Mickey.forEach( els, function( el ) {
    
    var el = el.element,
        i = 0,
        opts = opts || {},
        speed = opts.speed || 0;
        
    setInterval( function() {
  
      i += 1 + speed;
      
      el.style.transform='rotate(' + i + 'deg)';
      
      
    }, 10)
    
  });
  
  
  
}


document.body.addEventListener('mousemove', function( e ) {
  
  Mickey.top = e.pageY,
  Mickey.left = e.pageX;
  
})
