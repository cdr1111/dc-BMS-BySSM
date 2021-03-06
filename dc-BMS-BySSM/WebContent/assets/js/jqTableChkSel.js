/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * 基于bootstrap table和jquery ui的树形选择弹窗
 */
(function ($) {
    var methods = {
        init: function (options) {
            var tableSetting = $.extend({}, $.fn.jqTableChkSel.defVal.tableSetting, options.tableSetting);
            var optVals = $.extend({}, $.fn.jqTableChkSel.defVal, options);
            tableSetting.toolbar = optVals.dlgSel + " " + tableSetting.toolbar;
            optVals.tableSetting = tableSetting;
            return this.each(function () {
                var $this = $(this);
                var data = $this.data($.fn.jqTableChkSel.constVal.dataName);
                var rsFillSel = optVals.rsFillSel;
                var selTrigger = optVals.selTrigger;
                // If the plugin hasn't been initialized yet
                if (!data) {
                    $(optVals.dlgSel + " " + optVals.dlgTableContent).bootstrapTable(tableSetting);
                    $(optVals.dlgSel + " .tool-bar form input").bind("keydown", function (e) {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                            e.stopPropagation();
                            $(optVals.dlgSel + " .tool-bar form").find(optVals.toolbarSearchBtn).trigger("click");
                        }
                    });
                     $(optVals.dlgSel + " .tool-bar form").find(optVals.toolbarSearchBtn).bind("click",function(e){
                         $(optVals.dlgSel + " " + optVals.dlgTableContent).bootstrapTable("refresh",{silent: true});
                     });
                    
                    $(optVals.dlgSel).dialog({
                        modal: true,
                        width: optVals.dlgWidth,
                        height: optVals.dlgHeight,
                        autoOpen: false,
                        buttons: [
                            {
                                text: "关闭",
                                click: function () {
                                    $(this).dialog("close");
                                }
                            }
                        ]
                    });

                    $this.data($.fn.jqTableChkSel.constVal.dataName, optVals);
                    $(this).attr("out-" + $.fn.jqTableChkSel.constVal.dataName, "out");
                    $(document).on("click", selTrigger, function (e) {
                    	if(optVals.beforeRefresTable){
                    		optVals.beforeRefresTable(e);
                    	}
                        $(optVals.dlgSel)[0].event = e;
                        $(optVals.dlgSel + " " + optVals.dlgTableContent).bootstrapTable("refresh",{silent: true});
                        $(optVals.dlgSel).dialog("open");
                    });
                }
            });
        },
        destroy: function (options) {
            return this.each(function () {
//                var $this = $(this),
//                    data = $this.data(optVals.dataName);
//                // Namespacing FTW
//                $(window).unbind('.tooltip');
//                data.hstabs.remove();
//                $this.removeData('tooltip');
            })
        },
        queryParams: function (param) {
        	var newParam="";
		    if(param.offset!=='undefined' && param.limit!=='undefined'){
		    	var pageSize=param.limit;
		    	var offset=param.offset;
		    	pageSize=parseInt(pageSize, 10);
		    	offset=parseInt(offset, 10);
		    	var pageNo=1;
		    	if(pageSize!==0){
		    		var pageNo=offset/pageSize+1;
		    	}
		    	//pageNumber 请求的页码
		        newParam+="&pageNo="+pageNo;
		        //每页有多少条数据
		        newParam+="&pageSize="+param.limit;
		    }
    	    
    	    if(param.search){//搜索关键词
    	        newParam+="&search="+encodeURIComponent(param.search);
    	    }
    	    if(param.sort){//排序关键字
    	        newParam+="&sort="+encodeURIComponent(param.sort);
    	    }
    	    if(param.order){//排序方法
    	        newParam+="&order="+param.order;
    	    }
        	
            if (this.selFormSel) {
                var selTable = this.selFormSel;
                var formStr = $(this.toolbar).find(selTable).serialize();
                newParam += "&" + formStr;
            }

            if (newParam.indexOf("&") === 0) {
                newParam = newParam.substring(1);
            }
            return newParam;
        }
    };

    $.fn.jqTableChkSel = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' 方法在$.fn.hstabs中不存在。');
        }
    };
    $.fn.jqTableChkSel.newCount = 1;
    $.fn.jqTableChkSel.defVal = {
        tableSetting: {
            height: 400,
            selFormSel: "form",
            url: "./BootStrapTable.action",
            queryParams: methods.queryParams,
            toolbar: ".tool-bar",
            clickToSelect: "false",
            checkboxHeader:true
        },
        dlgSel: "#ask-dlg-id",
        dlgHeight: 700,
        dlgWidth: 800,
        dlgTableContent: ".table-content",
        selTrigger: ".table-dlg-sel",
        toolbarSearchBtn:".search-btn",
        beforeRefresTable:function(e){
        	
        }

    };
    $.fn.jqTableChkSel.constVal = {
        dataName: "table-sel-dlg"
    }
    $.fn.jqTableChkSel.verInfor = {
        version: "1.0000",
        verdate: "2015-06-01",
        verauthor: "lwt"
    };

})(jQuery);

