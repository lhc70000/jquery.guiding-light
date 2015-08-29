# cfcoptions : { "out": "../" }

###
jQuery-GuidingLight
v 0.11
by lhc (lhc199652 at gmail.com)
###

do ($ = jQuery) ->

    class GuidingLight
        constructor: (@container = $('.cgl-container'), @doc) ->
            @history = []
            @log = []
            # only one element for one object
            if @container.length != 1
                throw new Error('Guiding Light: Too many container object!')
            @container.empty().addClass('cgl-container')
            # load index
            if @doc = @doc || @container.data 'cgl-doc'
                @load('#index')
            else
                throw new Error('Guiding Light: Tutorial document not found!')
            
        guidelize: (container = @container) ->
            gl = this
            # hr
            container.prepend('<hr>')
            container.prepend("<div class=\"cgl-order\">#{@history.length}</div>")
            # 'for' labels
            container.find('*[data-for]').each ->
                self = $ this
                for_what = self.data('for')
                if gl.log.indexOf(for_what) < 0
                    self.css 'display', 'none'
            container.find('*[data-not-for]').each ->
                self = $ this
                for_what = self.data('not-for')
                if gl.log.indexOf(for_what) >= 0
                    self.css 'display', 'none'
            # block options
            need_nav = true
            need_nav = false if @history[0].name == '#finish'
            container.find('.cgl-block-option').each ->
                need_nav = false
                self = $ this
                if img_url = self.data 'img'
                    self.prepend("<img src=\"#{img_url}\" />")
                [target, is_new_window] = GuidingLight.parse_target(self.data 'target')
                if target
                    self.click ->
                        container.find('.cgl-prev, .cgl-next').remove()
                        self.addClass('active')
                        self.siblings('.cgl-block-option').addClass('disabled').off('click')
                        self.off('click')
                        gl.log.unshift(self.data 'value')
                        gl.load(target, is_new_window)            
            # nav btns
            if @history.length > 1
                prev_btn = $('<div class="cgl-prev">Back to previous step</div>')
                prev_btn.click =>
                    container.find('.cgl-prev, .cgl-next').remove()
                    @history.shift().section.remove()  # current section
                    @log.shift()
                    if last = @history.shift()
                        last.section.remove()
                        @load(last.name)
            if need_nav
                next_btn = $('<div class="cgl-next">I completed this step</div>')
                next_btn.click =>
                    
                    div = container.find('div[id]').first()
                    if target = div.data('target')
                        container.find('.cgl-prev, .cgl-next').remove()
                        gl.load(target, div.data('new-page'))
            container.append(prev_btn).append(next_btn)
            
        load: (target, new_window = false) ->
            @container.empty() if new_window
            @container.append(sec = GuidingLight.section())
            @history.unshift
                name: target
                section: sec
            sec.load "#{@doc} #{target}", =>
                @guidelize(sec)
                        
        @section: ->
            $('<div class="cgl-section"></div>')
                    
        @parse_target: (t) ->
            if t[0] == '^'
                [t.substr(1), false]
            else
                [t, true]

    jQuery.fn.guidingLight = (options = {}) ->
        this.each ->
            container = $ this
            doc = options.doc || container.data 'cgl-doc'
            console.log doc
            new GuidingLight(container, doc)
            
    $(document).ready ->
        $('.cgl-container').guidingLight()