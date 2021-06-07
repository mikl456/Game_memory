/**
 * Plagin
 * Game memory
 * v1.0
 * 
 *  
 */

;(function($){
    $.fn.pluginMemory = function(options){
        options = $.extend({
            quantity: 5,
            time: 1000,
            margin: 2,
            delay: 500,
            img: 'blank.png'
        },options);

        if(options.quantity < 0 || options.quantity > 5)
            options.quantity = 5;
        
        class Game{
            constructor(el){
                this.memorySection = el;
                this.arr = [];
                this.id = '';
            }

            generateArr(){
              let arr = Array.from( Array(options.quantity), (_,x) => x+1 );
              arr = [...arr, ...arr];
              this.arr = arr.sort( () => Math.random() - .5 );
                console.log(this.arr);
            }

            generateHTML(){
                this.memorySection 
                    .css({
                        'display': 'grid',
                        'grid-template-columns': `repeat(${options.quantity}, 1fr)`,
                        'gap': options.margin 
                    })
                    .html( this.arr.map (item => `
                        <div class="item">
                            <img src="images/${item}.jpg">
                            <div class="cover" data-id="${item}"></div>
                        </div>
                    `));
            }

            gamePlay(){
                let id = this.id;
                $('.cover')
                    .hide(0)
                    .delay(options.time)
                    .show(0)
                    .on('click', function(){
                        $(this).hide(0);
                        if(!id){
                            console.log('1');
                            id = $(this).data('id');
                            console.log(id)
                        }
                        else{
                            console.log('2');
                            if(id === $(this).data('id')){
                                console.log('одинаковые');
                            }
                            else{
                                console.log('разные');
                            }
                            id = ''
                        }
                    })
            }

            init(){
                this.generateArr();
                this.generateHTML();
                this.gamePlay();
            }

        }

        // $('#wrap-memory') ==> $(this)
        let game = new Game( $(this) );
        game.init();

        return this;
    }

})(jQuery);