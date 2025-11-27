<script>
    // Import global CSS once
    import "../app.css";
    import { auth_token } from "@src/store.js";
    import LoadingPage from "./LoadingPage.svelte";

    let loading = false;

    import {
        Breadcrumb,
        Button,
        Navbar,
        NavHamburger,
        NavBrand,
        NavUl,
        NavLi,
    } from "flowbite-svelte";

    // Import Toaster once (global notifications)
    import { Toaster } from "svelte-sonner";
    import { onMount } from "svelte";
    import { logout } from "@src/api.js";
</script>

{#if loading}
    <LoadingPage />
{:else}
    <Navbar class="bg-sky-100 dark:bg-primary-700">
        <NavBrand href="/" aria-label="Homepage">
            <span
                class="self-center font-bold whitespace-nowrap dark:text-white"
            >
                Darshan Mahakaal
            </span>

            <div>
                {#if $auth_token}
                    <Button
                        outline
                        pill
                        color="transparent"
                        class="ml-4 px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
                        onclick={() => window.history.back()}
                        aria-label="Go back"
                    >
                        Back
                    </Button>

                    <Button
                        outline
                        pill
                        color="transparent"
                        class="ml-4 px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
                        onclick={() => window.history.forward()}
                        aria-label="Go forward"
                    >
                        Next
                    </Button>
                {/if}
            </div>
        </NavBrand>

        <NavUl role="navigation" aria-label="Main navigation">
            <NavLi href="/">Home</NavLi>

            {#if $auth_token}
                <NavLi href="/dashboard">Dashboard</NavLi>
                <NavLi href="/dashboard/profile">Profile</NavLi>
            {:else}
                <NavLi href="/registration">Registration</NavLi>
                <NavLi href="/login">Login</NavLi>
            {/if}
        </NavUl>

        <NavHamburger aria-label="Toggle menu" />
        <div>
            {#if $auth_token}
                <Button outline pill color="orange" onclick={() => logout()}>
                    Logout
                </Button>
            {/if}
        </div>
    </Navbar>

    <!-- 🧩 Every page will render inside this slot -->
    <slot />

    <!-- 🔔 Global toast notification container -->
    <Toaster position="top-right" richColors closeButton />
{/if}
