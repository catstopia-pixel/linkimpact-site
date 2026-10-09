(()=>{
 const ko=document.getElementById('lang-ko'),en=document.getElementById('lang-en');
 const isEn=()=>en.checked;
 const copy=(a,b)=>isEn()?b:a;
 const modal=document.getElementById('receiptModal'),form=document.getElementById('receiptForm'),type=document.getElementById('donorType'),business=document.getElementById('businessFields'),number=document.getElementById('businessNumber'),submit=document.getElementById('receiptSubmit');
 let previous=null,busy=false,done=false;
 function translate(){document.querySelectorAll('[data-post-link]').forEach(a=>{const u=new URL(a.href);u.searchParams.set('lang',isEn()?'en':'ko');a.href=u.pathname+u.search});document.querySelectorAll('[data-copy-ko]').forEach(e=>e.textContent=isEn()?e.dataset.copyEn:e.dataset.copyKo);document.getElementById('donorNameLabel').textContent=type.value==='business'?copy('법인·사업자명 *','Business name *'):copy('기부자 성명 *','Donor name *');document.documentElement.lang=isEn()?'en':'ko';}
 function close(){modal.hidden=true;document.body.style.overflow='';previous?.focus()}
 document.getElementById('openReceipt').addEventListener('click',()=>{previous=document.activeElement;translate();modal.hidden=false;document.body.style.overflow='hidden';document.getElementById('closeReceipt').focus()});
 document.getElementById('closeReceipt').addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close()});
 type.addEventListener('change',()=>{const b=type.value==='business';business.classList.toggle('receipt-hidden',!b);number.required=b;translate()});
 [ko,en].forEach(r=>r.addEventListener('change',translate));window.addEventListener('linkimpact-language',translate);translate();
 document.addEventListener('keydown',e=>{if(modal.hidden)return;if(e.key==='Escape')close();if(e.key==='Tab'){const inputs=[...modal.querySelectorAll('button,input,select')].filter(x=>!x.disabled&&x.getClientRects().length);const first=inputs[0],last=inputs.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(busy||done)return;
  const error=document.getElementById('receiptError'),success=document.getElementById('receiptSuccess');error.hidden=true;success.hidden=true;
  const fd=new FormData(form),data=Object.fromEntries(fd.entries());data.consent=fd.get('consent')==='on';data.lang=isEn()?'en':'ko';
  busy=true;submit.disabled=true;submit.textContent=copy('신청 접수 중…','Submitting…');
  try{const response=await fetch('/api/forms/donation-receipt',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)});if(!response.ok)throw new Error();const result=await response.json();if(result.ok!==true)throw new Error();done=true;success.textContent=copy('접수되었습니다. 담당자가 입금과 발급 자격을 확인합니다.','Saved. A staff member will review your payment and eligibility.');success.hidden=false;submit.textContent=copy('신청 접수 완료','REQUEST SAVED')}
  catch{error.textContent=copy('신청을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.','Unable to save your request. Please try again.');error.hidden=false;submit.disabled=false;submit.textContent=copy('영수증 발급 검토 신청','SUBMIT FOR REVIEW')}
  finally{busy=false}
 });
})();
