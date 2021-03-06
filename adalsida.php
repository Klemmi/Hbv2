<!doctype html>
<html lang="is">
<head>
	<meta content='text/html' charset="UTF-8">
	<title>Launareiknir</title>
	<link rel="stylesheet" type='text/css' href="css/style2.css">
	<script type='text/javascript' src='js/jquery-1.3.2.min.js'></script>
	<script type='text/javascript' src='js/example.js'></script>

</head>
<body>

	<div id="page-wrap">
		<a onclick="prenta"><img src="prentari.jpg" alt="prenta sidu" id="print-button" /></a>
		<button onclick="myFunction()">Print this page</button>
		<textarea id="header">Launaseðill</textarea>
		
		<div id="identity">
		
            <textarea id="address">
            Fyrirtæki ehf.
            Aðalgata 20
            105 Reykjavík
            kt. 010114- 2009
            S: 555- 5555</textarea>

            
		
		</div>


		
		<div id="header-line" style="clear:both"></div>
		
		<div id="customer">

            <textarea id="customer-title">
            Jón Jónsson
            Langagata 1
            110 Reykjavík</textarea>

            <table id="meta">
                <tr>
                    <td class="meta-head">Tímabil</td>
                    <td><textarea id="date2">999</textarea></td>
                </tr>
                <tr>
                    <td class="meta-head">Útborgun þann</td>
                    <td><textarea id="date">999</textarea></td>
                </tr>
                <tr>
                    <td class="meta-head">Kennitala</td>
                    <td><textarea id="date">xxxxxx- xxxx</textarea></td>
                </tr>
                <tr>
                    <td class="meta-head">Laun</td>
                    <td><div class="due">0.00</div></td>
                </tr>

            </table>
		
		</div>
		
		<table id="items">
		
		  <tr>
		      <th>Lýsing</th>
		      <th>Einingar</th>
		      <th>Taxti</th>
		      <th>Upphæð</th>
		  </tr>

		  <tr class="title-row">
		      <td class="item-name"><p class="bold">Laun</p></td>
		  </tr>
		  
		  <tr class="item-row">
		      <td class="item-name"><div class="delete-wpr"><textarea>Dagvinna</textarea><a class="delete" href="javascript:;" title="Remove row">-</a></div></td>
		      <td><textarea class="cost">0.00</textarea></td>
		      <td><textarea class="qty">0.00</textarea></td>
		      <td><span class="price">0.00</span></td>
		  </tr>
		  
		  <tr class="item-row">
		      <td class="item-name"><div class="delete-wpr"><textarea>Yfirvinna</textarea><a class="delete" href="javascript:;" title="Remove row">-</a></div></td>

		      <td><textarea class="cost">0.00</textarea></td>
		      <td><textarea class="qty">0.00</textarea></td>
		      <td><span class="price">0.00</span></td>
		  </tr>

		  <tr class="item-row">
		      <td class="item-name"><div class="delete-wpr"><textarea>Álag</textarea><a class="delete" href="javascript:;" title="Remove row">-</a></div></td>

		      <td><textarea class="cost">0.00</textarea></td>
		      <td><textarea class="qty">0.00</textarea></td>
		      <td><span class="price">0.00</span></td>
		  </tr>

		  <tr class="item-row">
		      <td class="item-name"><div class="delete-wpr"><textarea>Orlof</textarea><a class="delete" href="javascript:;" title="Remove row">-</a></div></td>

		      <td><textarea class="ocost">10.17 %</textarea></td>
		      <td><span class="qty"></span></td>
		      <td><span class="oprice">0.00</span></td>
		  </tr>

		  <tr class="title-row">
		      <td class="item-name"><p class="bold">Laun alls</p></td>
		      <td><textarea class="pcost"></textarea></td>
		      <td><textarea class="pqty"></textarea></td>
		      <td class="total-value"><div id="subtotal">0.00</div></td>
		  </tr>

		  <tr class="item-row3">
		      <td colspan="4" class="item-name"><div id="header-line"></div></td>
		  </tr>

		  <tr class="title-row">
		      <td class="item-name"><p class="bold">Frádráttur</p></td>
		  </tr>
		  
		  <tr class="item-row2">
		      <td class="item-name"><div class="delete-wpr"><textarea>Orlofsreikningur</textarea><a class="delete2" href="javascript:;" title="Remove row">-</a></div></td>
		      <td><p class="cost"></p></td>
		      <td><p class="qty"></p></td>
		      <td><span class="minoprice">0.00</span></td>
		  </tr>
		  
		  <tr class="item-row2">
		      <td class="item-name"><div class="delete-wpr"><textarea>Félagsgjöld</textarea><a class="delete2" href="javascript:;" title="Remove row">-</a></div></td>

		      <td><textarea class="mincost1">0.70 %</textarea></td>
		      <td><span class="fqty"></span></td>
		      <td><span class="gjold1">0.00</span></td>
		  </tr>

		  <tr class="item-row2">
		      <td class="item-name"><div class="delete-wpr"><textarea>Lífeyrissjóður</textarea><a class="delete2" href="javascript:;" title="Remove row">-</a></div></td>

		      <td><textarea class="mincost2">4.00 %</textarea></td>
		      <td><span class="fqty"></span></td>
		      <td><span class="gjold2">0.00</span></td>
		  </tr>

		  <tr class="item-row2">
		      <td class="item-name"><div class="delete-wpr"><textarea>Skattar, þrep 1 (37,32% af tekjum 0 - 241.475 kr)</textarea><a class="delete2" href="javascript:;" title="Remove row">-</a></div></td>

		      <td><textarea class="skattcost1"></textarea></td>
		      <td><textarea class="pqty"></textarea></td>
		      <td class="total-value"><div id="skatt1">0.00</div></td>
		  </tr>

		  <tr class="item-row2">
		      <td class="item-name"><div class="delete-wpr"><textarea>Skattar, þrep 2 (40,22% af tekjum 241.476 - 739.509 kr)</textarea><a class="delete2" href="javascript:;" title="Remove row">-</a></div></td>

		      <td><textarea class="skattcost2"></textarea></td>
		      <td><textarea class="pqty"></textarea></td>
		      <td class="total-value"><div id="skatt2">0.00</div></td>
		  </tr>

		  <tr class="item-row2">
		      <td class="item-name"><div class="delete-wpr"><textarea>Skattar, þrep 3 (46,22% af tekjum yfir 739.509 kr)</textarea><a class="delete2" href="javascript:;" title="Remove row">-</a></div></td>

		      <td><textarea class="skattcost3"></textarea></td>
		      <td><textarea class="pqty"></textarea></td>
		      <td class="total-value"><div id="skatt3">0.00</div></td>
		  </tr>

		  <tr class="item-row2">
		      <td class="item-name"><div class="delete-wpr"><textarea>Persónuafsláttur</textarea><a class="delete2" href="javascript:;" title="Remove row">-</a></div></td>

		      <td><textarea class="skattpro"></textarea></td>
		      <td><textarea class="skatthlut1">48485.00</textarea></td>
		      <td><span id="personu"></span></td>
		  </tr>

		  <tr class="title-row">
		      <td class="item-name"><p class="bold">Frádráttur alls</p></td>
		      <td><textarea class="pcost"></textarea></td>
		      <td><textarea class="pqty"></textarea></td>
		      <td class="total-value"><div id="deduction">0.00</div></td>
		  </tr>
		  
		  
		  <tr>

		      <td colspan="2" class="blank"> </td>
		      <td colspan="2" class="total-line">Total</td>
		      <td class="total-value"><div id="total">0.00</div></td>
		  </tr>
		  
		
		</table>
	
	</div>

</body>
</html>