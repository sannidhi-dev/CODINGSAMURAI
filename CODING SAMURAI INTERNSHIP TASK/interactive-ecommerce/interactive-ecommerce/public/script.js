const products=[
{id:1,name:"Nova Wireless Headphones",cat:"Tech",price:4999,rating:4.9,icon:"🎧",tag:"BESTSELLER",desc:"Immersive wireless audio with active noise cancellation and 40-hour battery life."},
{id:2,name:"Aero Smart Watch",cat:"Tech",price:3299,rating:4.7,icon:"⌚",tag:"NEW",desc:"Minimal smartwatch with fitness tracking, notifications and a bright AMOLED display."},
{id:3,name:"Urban Runner Sneakers",cat:"Fashion",price:2799,rating:4.8,icon:"👟",tag:"HOT",desc:"Lightweight everyday sneakers designed for comfort, movement and street style."},
{id:4,name:"Cloud Desk Lamp",cat:"Home",price:1499,rating:4.6,icon:"💡",tag:"",desc:"A soft-glow smart desk lamp with adjustable brightness for work and study."},
{id:5,name:"Orbit Backpack",cat:"Accessories",price:2199,rating:4.8,icon:"🎒",tag:"POPULAR",desc:"Water-resistant backpack with laptop protection and smart organization."},
{id:6,name:"Pulse Mechanical Keyboard",cat:"Tech",price:3899,rating:4.9,icon:"⌨️",tag:"PRO",desc:"Tactile mechanical keyboard with customizable RGB lighting and compact layout."},
{id:7,name:"Everyday Hoodie",cat:"Fashion",price:1899,rating:4.5,icon:"🧥",tag:"",desc:"Soft premium cotton hoodie with a relaxed fit for everyday comfort."},
{id:8,name:"Zen Ceramic Set",cat:"Home",price:999,rating:4.6,icon:"☕",tag:"",desc:"Elegant minimalist ceramic cups for coffee, tea and relaxed mornings."}
];

let cart=JSON.parse(localStorage.getItem("shopsphere-cart")||"[]");
let activeCat="All";

const money=n=>"₹"+n.toLocaleString("en-IN");
const save=()=>{localStorage.setItem("shopsphere-cart",JSON.stringify(cart));updateCartCount();};
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("show"),2200)}
function render(){
 let q=document.getElementById("search").value.toLowerCase().trim();
 let list=products.filter(p=>(activeCat==="All"||p.cat===activeCat)&&(p.name.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q)));
 const sort=document.getElementById("sort").value;
 if(sort==="low")list.sort((a,b)=>a.price-b.price);
 if(sort==="high")list.sort((a,b)=>b.price-a.price);
 if(sort==="rating")list.sort((a,b)=>b.rating-a.rating);
 document.getElementById("empty").hidden=list.length>0;
 document.getElementById("grid").innerHTML=list.map(p=>`
 <article class="product">
   <div class="pic">${p.tag?`<span class="badge">${p.tag}</span>`:""}${p.icon}</div>
   <div class="product-body">
     <div class="rating">★★★★★ <span>${p.rating}</span></div>
     <h3>${p.name}</h3><small>${p.cat}</small>
     <div class="price">${money(p.price)}</div>
     <button class="add" onclick="addToCart(${p.id})">Add to cart</button>
     <button class="add" onclick="showDetails(${p.id})">Quick view</button>
   </div>
 </article>`).join("");
}
function addToCart(id){
 const p=products.find(x=>x.id===id);const found=cart.find(x=>x.id===id);
 if(found)found.qty++;else cart.push({id,qty:1});
 save();toast(`${p.name} added to cart`);
}
function updateCartCount(){document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0)}
function openCart(){renderCart();document.getElementById("cartModal").classList.add("show")}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML='<div class="empty">Your cart is empty.<br><br>Start shopping to add something.</div>';document.getElementById("cartTotal").textContent="₹0";return}
 box.innerHTML=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-row"><div class="cart-icon">${p.icon}</div><div class="cart-info"><b>${p.name}</b><small>${money(p.price)} each</small></div><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><b>${x.qty}</b><button onclick="changeQty(${p.id},1)">+</button></div><button class="remove" onclick="removeItem(${p.id})">Remove</button></div>`}).join("");
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0));
}
function changeQty(id,n){const x=cart.find(i=>i.id===id);x.qty+=n;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save();renderCart()}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save();renderCart();toast("Item removed")}
function openLogin(){document.getElementById("loginModal").classList.add("show")}
function login(){const e=document.getElementById("loginEmail").value;if(!e){toast("Enter your email");return}closeModal("loginModal");toast("Welcome back! Demo login successful.")}
function openCheckout(){if(!cart.length){toast("Your cart is empty");return}closeModal("cartModal");document.getElementById("checkoutModal").classList.add("show")}
async function placeOrder(){
 const customer={name:document.getElementById("name").value,address:document.getElementById("address").value,phone:document.getElementById("phone").value};
 if(!customer.name||!customer.address||!customer.phone){toast("Please complete your details");return}
 const total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
 try{
  const r=await fetch("/api/order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({customer,items:cart,total})});
  const data=await r.json();
  if(data.ok){cart=[];save();closeModal("checkoutModal");toast(`Order ${data.orderId} placed successfully!`)}
 }catch(e){toast("Server connection error")}
}
function showDetails(id){
 const p=products.find(x=>x.id===id);
 document.getElementById("details").innerHTML=`<div class="detail-content"><div class="detail-img">${p.icon}</div><div><p class="eyebrow">${p.cat}</p><h2>${p.name}</h2><div class="rating">★★★★★ ${p.rating}</div><h2>${money(p.price)}</h2><p style="color:#777;line-height:1.7">${p.desc}</p><button class="primary wide" onclick="addToCart(${p.id});closeModal('detailsModal')">Add to cart</button></div></div>`;
 document.getElementById("detailsModal").classList.add("show");
}
function closeModal(id){document.getElementById(id).classList.remove("show")}
function showOffer(){toast("Today's offer: 25% off selected products 🎉")}
function subscribe(e){e.preventDefault();toast("You're subscribed! Check your inbox.");document.getElementById("email").value=""}
function scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}

document.getElementById("search").addEventListener("input",render);
document.getElementById("sort").addEventListener("change",render);
document.querySelectorAll(".cat").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".cat").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeCat=b.dataset.cat;render()}));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("show")}));
render();updateCartCount();
