      'use strict'

      $(function() {
        var $price_input = $('.price');
        var $value_input = $('.value');
        var $discount_input = $('.discount');

        var $price_approval_range = $('.price-approval-range');
        var $tradein_approval_range = $('.tradein-approval-range');
        var approval_range_width = $tradein_approval_range.width();

        var $thumbnail = $('.thumbnail'); 

        $('#price-slider').slider({
          range: "min",
          value: 1000,
          step: 100,
          min: 0,
          max: 100000,
          slide: function(event, ui) {
            $price_input.val(ui.value);
            calcPercentageFromPrice($value_input.val(), $price_input.val());
            calcApprovalRange();
            filterProducts();
          }
        });
        $($price_input).on('change',function(event, ui) {
          $('#price-slider').slider("value", this.value);
        });        
        $($price_input).on('focusout keydown', function(event, ui) {
          if(event.keyCode == 13) {
            calcPercentageFromPrice($value_input.val(), $price_input.val());
            calcApprovalRange();
            filterProducts();
          }
        });

        $('#tradein-slider').slider({
          range: "min",
          value: 0,
          step: 10,
          min: 0,
          max: 100,
          slide: function(event, ui) {
            $discount_input.val(ui.value);
            calcTradeInValue($price_input.val(), $discount_input.val());
            calcApprovalRange();
          }
        });
        $($discount_input).on('change', function() {
          $('#tradein-slider').slider("value", calcPercentageFromTradeIn($value_input.val(), $price_input.val()));
        });       
        $($discount_input).on('focusout keydown', function(event) {
          if(event.keyCode == 13) {
            calcTradeInValue($price_input.val(), $discount_input.val());
          }
        });

        $($value_input).change(function() {
          $('#tradein-slider').slider("value", calcPercentageFromTradeIn($value_input.val(), $price_input.val()));
        });
        $($value_input).on('focusout keydown', function(event) {
          if(event.keyCode == 13) {
            calcPercentageFromTradeIn($value_input.val(), $price_input.val());
            calcApprovalRange();
          }
        });


        function calcPercentageFromPrice(value, price){
          if(value > 0 && price > 0) {
            return $discount_input.val(Math.round((value / price) * 100));
          }
        }
        
        function calcPercentageFromTradeIn(value, price){
          if(value > 0 && price > 0) {
            $discount_input.val(Math.round((value / price * 100)));
            return Math.round((value / price * 100));
          }
        }

        function calcTradeInValue(price, discount) {
          if(price > 0 && discount > 0)
          return $value_input.val(Math.round(price * (discount / 100)));
        }

        function calcApprovalRange() {
          var newWidth = Math.round(approval_range_width + (approval_range_width * ($discount_input.val() / 100)));
          return $tradein_approval_range.css({width: newWidth + 'px'});
        }

        function filterProducts() {
          $thumbnail.hide().each(function(){
            if($(this).data("price") < $price_input.val()){
              $(this).fadeIn();
            };
          });
        } 
      });