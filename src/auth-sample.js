{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}

{
  "rules": {
    ".read": true,
    ".write": true
  }
}

<ul>
{this.state.items.map((item) => {
  return (
    <li key={item.id}>
      <h3>{item.title}</h3>
      <p>brought by: {item.user}
         {item.user === this.state.user.displayName || item.user === this.state.user.email ?
           <button onClick={() => this.removeItem(item.id)}>Remove Item</button> : null}
      </p>
    </li>
  )
})}
</ul>