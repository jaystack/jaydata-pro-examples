var URLHandler = {
    cache: {},
    get: function get( name, url )
    {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    add: function add( name, value )
    {
        this.cache[name] = ""+(value||"");
    },
    clear: function clear( )
    {
        this.cache = {};
    },
    reload: function()
    {
        var url = window.location.origin+"?";
        for(var key in this.cache)
        {
            url+=key+"="+this.cache[key];
        }
        window.location.href = url;
    }
};
