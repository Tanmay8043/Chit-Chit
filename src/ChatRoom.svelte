<script>
    import {db} from "./firebase";
    import { collectionData } from "rxfire/firestore";
    import { startWith } from "rxjs/operators";
import { collection, doc, addDoc } from "firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore";  
 
    export let user;
    export let logout;

    let message="";

    const q1 = collection(db, "chats");
	const q = query(q1, orderBy("sentAt", "asc"));
    const chats = collectionData(q, "id").pipe(startWith([]));


    async function sendMessage() {
		if(message !="")
        {const docRef = await addDoc(collection(db, "chats"), {
           uid: user.uid,
           message: message,
           avatar: user.photoURL,
           sentAt: +new Date() 
        });
        message = "";}
    }
</script>

<main>
    <div class="header">
        <div class="logo">Chit-chit</div>
        <button on:click={logout}>Logout</button>
    </div>
    <div class="messages ove">
        {#each $chats as chat}
            {#if user.uid == chat.uid}
                <div class="message my-message">
                    <div class="text">
                        {chat.message}
                    </div>
                </div>
            {:else}
            <div class="message other-message">
                <div class="avatar">
                    <img src={chat.avatar} alt="">
                </div>
                <div class="text">
                    {chat.message}
                </div>
            </div>
            {/if}
        {/each}
    </div>
    <div class="form">
        <input type="text" bind:value={message} >
        <button on:click={sendMessage}>
            <i class="fa fa-paper-plane"></i>
        </button>
    </div>
</main>

<style>
    main {
		height: 100%;
	}
	.header {
		width: 95%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0px 10px;
		border-bottom: 1px solid #ddd;
	}
	.header .logo {
		font-size: 20px;
		font-weight: 600;
		color: #111;
	}
	.header button {
		margin-top: auto;
		background: transparent;
		padding: 5px 10px;
		border: 1px solid #ddd;
		color: #555;
		font-size: 15px;		cursor: pointer;
	}

	.header button:hover{
		background-color:gray;
		font-weight: bold;
	}

	.form {
		width: 100%;
		height: 40px;
		border-top: 1px solid #ddd;
	}
	.form input {
		flex: 1;
		border: none;
		outline: none;
		font-size: 16px;
		display: inline;
		width: 80%;
		color: #111;
		padding: 10px;
		margin-bottom: 20px;
	}
	.form button {
		display:inline;
		margin-left: 8px;
		padding: 10px;
		font-size: 20px;
		color: #555;
		background: transparent;
		border: none;
		outline: none;
		cursor: pointer;
	}
	.messages {
		background-color: #111;
		width: 95%;
		height: calc(100% - 120px);
		padding: 10px;
		overflow-y: auto;
	}
	.messages::-webkit-scrollbar {
		width: 4px;
		background: #fff;
	}
	.messages::-webkit-scrollbar-thumb {
		width: 4px;
		background: #888;
	}
	.messages .message {
		margin: 10px 0px;
		display: flex;
	}
	.messages .my-message {
		justify-content: flex-end;
	}
	.messages .message .avatar {
		width: 30px;
		height: 30px;
		margin-right: 8px;
	}
	.messages .message .text {
		padding: 10px;
		background: #f0f4f7;
		color: #555;
		font-size: 13px;
		font-weight: 600;
		max-width: fit-content;
		flex: 1;
		border-radius: 5px;
	}
	.messages .message .avatar img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.messages .my-message .text {
		background: #555;
		color: #fff;
	}
</style>