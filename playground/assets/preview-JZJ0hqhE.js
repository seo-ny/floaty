const s={actions:{argTypesRegex:"^on[A-Z].*"},controls:{expanded:!1},options:{showPanel:!0,panelPosition:"right"},layout:"fullscreen"},a=[t=>{const e=document.createElement("div");e.classList.add("container"),e.innerHTML=`
      <div class="wrapper">
        <div class="box"></div>
      </div>
    `;const n=t();e.querySelector(".box").appendChild(n);const o=document.createElement("div");return o.classList.add("box","bottom"),document.body.appendChild(o),e}];export{a as decorators,s as parameters};
