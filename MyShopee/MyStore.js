var jsonData = [
    {
        "name": "1",
        "url": "1.jpg",
        "color": "Yellow",
        "brand": "BRAND A",
        "sold_out": "1"
    },
    {
        "name": "2",
        "url": "2.jpg",
        "color": "Red",
        "brand": "BRAND B",
        "sold_out": "0"
    },
    {
        "name": "3",
        "url": "3.jpg",
        "color": "Green",
        "brand": "BRAND D",
        "sold_out": "0"
    },
    {
        "name": "4",
        "url": "4.jpg",
        "color": "Red",
        "brand": "BRAND A",
        "sold_out": "1"
    },
    {
        "name": "5",
        "url": "5.jpg",
        "color": "Blue",
        "brand": "BRAND B",
        "sold_out": "0"
    },
    {
        "name": "6",
        "url": "6.jpg",
        "color": "Green",
        "brand": "BRAND C",
        "sold_out": "0"
    },
    {
        "name": "7",
        "url": "7.jpg",
        "color": "Red",
        "brand": "BRAND C",
        "sold_out": "1"
    },
    {
        "name": "8",
        "url": "8.jpg",
        "color": "Blue",
        "brand": "BRAND D",
        "sold_out": "0"
    },
    {
        "name": "9",
        "url": "9.jpg",
        "color": "Yellow",
        "brand": "BRAND A",
        "sold_out": "0"
    },
    {
        "name": "10",
        "url": "10.jpg",
        "color": "Yellow",
        "brand": "BRAND B",
        "sold_out": "1"
    },
    {
        "name": "11",
        "url": "11.jpg",
        "color": "Green",
        "brand": "BRAND D",
        "sold_out": "0"
    },
    {
        "name": "12",
        "url": "12.jpg",
        "color": "Yellow",
        "brand": "BRAND D",
        "sold_out": "0"
    },
    {
        "name": "13",
        "url": "13.jpg",
        "color": "Blue",
        "brand": "BRAND A",
        "sold_out": "0"
    },
    {
        "name": "14",
        "url": "14.jpg",
        "color": "Blue",
        "brand": "BRAND D",
        "sold_out": "0"
    },
    {
        "name": "15",
        "url": "15.jpg",
        "color": "Green",
        "brand": "BRAND B",
        "sold_out": "0"
    },
    {
        "name": "16",
        "url": "16.jpg",
        "color": "Yellow",
        "brand": "BRAND B",
        "sold_out": "1"
    },
    {
        "name": "17",
        "url": "17.jpg",
        "color": "Green",
        "brand": "BRAND A",
        "sold_out": "1"
    },
    {
        "name": "18",
        "url": "18.jpg",
        "color": "Blue",
        "brand": "BRAND D",
        "sold_out": "1"
    },
    {
        "name": "19",
        "url": "19.jpg",
        "color": "Green",
        "brand": "BRAND C",
        "sold_out": "0"
    },
    {
        "name": "20",
        "url": "20.jpg",
        "color": "Yellow",
        "brand": "BRAND A",
        "sold_out": "0"
    }
];
var setFilter = function(a){//it is the value of the checkbox
	$('#main #productPane div').removeClass('show_initial');
	var $brands=$('#main #selectorPane .brand');
	var $colors=$('#main #selectorPane .color');
	var $productPane=$('#main #productPane');
	var flag=false;
	for(var i=0;i<$brands.length;i++){
		var sel ='.'+$brands[i].value;
		if($brands[i].checked){
			flag=true;
			$productPane.find(sel).addClass("show");
		}
		else{$productPane.find(sel).removeClass("show");}
	}
	flag==false?$('#main #productPane div').addClass("show"):null;//no brand sel
	var $shownBrands =$('#main #productPane .show');//shown divs
	flag=false;
	for(var i=0;i<$colors.length;i++){
		if($colors[i].checked){
			flag=true;break;
		}
	}
	if(flag==true){
	$shownBrands.each(function(){
		for(var i=0;i<$colors.length;i++){
			if(!$colors[i].checked){
				if($(this).hasClass($colors[i].value)){
				$(this).removeClass("show");
				}
			}
		}
	});
}//if
	$shownBrands =$('#main #productPane .show');//shown divs
	var showAll=0;
	var sold_out=$('#main #selectorPane .sold_out');
	var flag=false;
	if(sold_out[0].checked) showAll=0;
	if(sold_out[1].checked) showAll=1;
	if(showAll==1){
	$shownBrands.each(function(){
		if($(this).hasClass('1')){
			$(this).removeClass("show");
		}
	});
	}
}

var ProductList= function(){
var productArr=[];
for(var i=0;i<jsonData.length;i++){
	productArr[i]=jsonData[i];
}
this.currentProducts=productArr;
this.display();

}//ProductList class
ProductList.prototype={
	display:function(){
		$('#selectorPane .chkOptions input').attr("onclick","setFilter(this)");
		for(var i=0;i<this.currentProducts.length;i++){
			var img ="<img src='"+"images/"+(i+1)+".jpg"+"' />";
			var productClass=this.currentProducts[i].brand[6]+" "+this.currentProducts[i].color+" "+this.currentProducts[i].sold_out+" "+"show_initial";
			$('#main #productPane').append("<div>"+img+"</div").find('div:last').addClass(productClass);
		}
	}//display
}//prototype
