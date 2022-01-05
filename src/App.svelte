<script>
	import { auth, googleProvider} from "./firebase";
    import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
	import ChatRoom from "./ChatRoom.svelte";

	import { authState } from "rxfire/auth";

	let user;

	const unsubscribe = authState(auth).subscribe(usr => user=usr);

	const login = async ()=>{
        try {
            const res = await signInWithPopup(auth, googleProvider);
        
            console.log(res.user);
        } catch (e) {
            console.error(e);
        }
    }

	function logout() {
		auth.signOut();
	}

</script>

<main>
	{#if user}
		<ChatRoom user={user} logout={logout} />
	{:else}
	<div class="login-form">
		<button on:click={login}>
			<i class="fa fa-google"></i>
			Signin with google
		</button>
	</div>
	{/if}
</main>

<style>
	main {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 100%;
		height: 100%;
		max-width: 400px;
		max-height: 500px;
		background: rgb(141, 137, 137);
		border: 1px solid #eee;
		box-shadow: 0px 5px 10px rgba(0,0,0,0.05);
	}
	.login-form {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);	
	}
	.login-form button {
		padding: 10px;
		background: #fff;
		color: #111;
		font-size: 16px;
		cursor: pointer;
		outline: none;
		border: 1px solid #bbb;
	}
	.login-form button i.fa {
		padding-right: 10px;
		border-right: 1px solid #ddd;
		color: #555;
	}
</style>