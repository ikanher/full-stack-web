(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),u=t.n(c),o=t(3),l=function(e){var n=e.message;if(!n.msg)return null;var t={padding:"20px",backgroundColor:n.color,color:"white",marginBottom:"15px"};return r.a.createElement("div",{style:t},n.msg)},i=function(e){var n=e.filter,t=e.handleFilterChange;return r.a.createElement(r.a.Fragment,null,"Filter shown with",r.a.createElement("input",{type:"text",value:n,onChange:t}))},m=function(e){var n=e.newName,t=e.handleNameChange,a=e.newNumber,c=e.handleNumberChange,u=e.handleAddPerson;return r.a.createElement("form",{onSubmit:u},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:t}),r.a.createElement("br",null),"number: ",r.a.createElement("input",{value:a,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=function(e){var n=e.entries,t=e.filter,a=e.handleDeleteClick,c=n.filter(function(e){return e.name.toLowerCase().includes(t.toLowerCase())}).map(function(e){return r.a.createElement(f,{key:e.name,entry:e,handleDeleteClick:a})});return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Persons"),c)},f=function(e){var n=e.entry,t=e.handleDeleteClick;return r.a.createElement("p",null,n.name," ",n.number," ",r.a.createElement(function(e){var n=e.entry;return r.a.createElement("button",{value:n.id,onClick:t},"Delete")},{entry:n})," ")},h=function(e){var n=e.persons,t=e.handleAddPerson,a=e.newName,c=e.handleNameChange,u=e.newNumber,o=e.handleNumberChange,f=e.filter,h=e.handleFilterChange,s=e.handleDeleteClick,g=e.notification;return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(l,{message:g}),r.a.createElement(i,{filter:f,handleFilterChange:h}),r.a.createElement(m,{newName:a,handleNameChange:c,newNumber:u,handleNumberChange:o,handleAddPerson:t}),r.a.createElement(d,{entries:n,filter:f,handleDeleteClick:s}))},s=t(2),g=t.n(s),b="/api/persons",v=function(){return g.a.get(b).then(function(e){return e.data})},C=function(e){return g.a.post(b,e).then(function(e){return e.data})},p=function(e){return g.a.put("".concat(b,"/").concat(e.id),e).then(function(e){return e.data})},E=function(e){return g.a.delete("".concat(b,"/").concat(e))},w=function(e){return g.a.get("".concat(b,"/").concat(e)).then(function(e){return e.data})},N=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),l=Object(o.a)(u,2),i=l[0],m=l[1],d=Object(a.useState)(""),f=Object(o.a)(d,2),s=f[0],g=f[1],b=Object(a.useState)(""),N=Object(o.a)(b,2),k=N[0],j=N[1],O=Object(a.useState)({}),y=Object(o.a)(O,2),D=y[0],F=y[1];Object(a.useEffect)(function(){v().then(function(e){return c(e)})},[]);return r.a.createElement(h,{persons:t,handleAddPerson:function(e){e.preventDefault();var n=t.filter(function(e){return e.name.toLowerCase()===i.toLowerCase()});if(n.length>0){var a=n[0].id;w(a).then(function(e){var n="".concat(e.name," exists. Update?");window.confirm(n)&&(e.number=s,p(e).then(function(){var n=t.filter(function(e){return e.id!==a}).concat(e);c(n),F({msg:"Number updated for ".concat(e.name,"!"),color:"green"}),setTimeout(function(){return F({})},2e3)}))}).catch(function(){var e="".concat(i," has already been removed from server...");F({msg:e,color:"red"}),setTimeout(function(){return F({})},2e3);var n=t.filter(function(e){return e.id!==a});c(n)})}else C({name:i,number:s}).then(function(e){c(t.concat(e)),F({msg:"".concat(e.name," added!"),color:"green"}),setTimeout(function(){return F({})},2e3)}).catch(function(e){F({msg:e.response.data.error,color:"red"}),setTimeout(function(){return F({})},2e3)});m(""),g("")},newName:i,handleNameChange:function(e){return m(e.target.value)},newNumber:s,handleNumberChange:function(e){return g(e.target.value)},filter:k,handleFilterChange:function(e){return j(e.target.value)},handleDeleteClick:function(e){var n=e.target.value;w(n).then(function(e){window.confirm("Delete ".concat(e.name,"?"))&&E(n).then(function(){var e=t.filter(function(e){return e.id!==n});c(e)})})},notification:D})};u.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.6c94e4b1.chunk.js.map