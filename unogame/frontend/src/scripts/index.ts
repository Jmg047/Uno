import '../style.css'
import { validateForm } from './registration.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <h1 class="game-title">UNO Game</h1>
  <div class="container">
  <h1>Create an account</h1>
  <!-- Form -->
  <form id="form">
      <!-- Full Name -->
      <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" placeholder="Full Name" name="name" required>
      </div>
      <!-- Email -->
      <div class="form-group">
          <label for="username">Username</label>
          <input type="username" id="username" placeholder="Username" required name="username">
      </div>
      <!-- Password -->
      <div class="form-group">
          <label for="password1">Password</label>
          <input type="password" id="password1" placeholder="Create Password (8 character minimum)" required
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" 
          title="include 1 uppercase character, 1 lowercase character, and 1 number.">
      </div>
      <button type="submit">Register</button>
      <button type="submit">Login</button>
  </form>
  <!-- Error/Success Message -->
  <div class="message-container">
      <h3 id="message">Sign up now!</h3>
  </div>
</div>
  </div>
`

validateForm(document.querySelector<HTMLFormElement>('#form')!)
