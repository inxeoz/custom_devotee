<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { Card, Button, Label, Input } from "flowbite-svelte";
    import { Badge } from "flowbite-svelte";

    import { user_logged_in } from "@src/store.js";

    import { login } from "@src/api.js";

    import { toast } from "svelte-sonner";

    // phone as string to allow leading + / 0 etc
    export let phone = 0;
    let password: string = "Mpsedc123";
    let loading: boolean = false;

    async function Submit(e: SubmitEvent) {
        e?.preventDefault();
        loading = true;

        const json_data = await login(phone, password);

        if (json_data?.message) {
            toast.success("Login successful");
            // await goto("/dashboard");
            // user_logged_in.set(true);
        } else {
            toast.error("Login failed " + JSON.stringify(json_data));
            loading = false;
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <Card class="w-full max-w-md p-10">
        <form class="space-y-4" on:submit={Submit} aria-busy={loading}>
            <h2 class="text-xl font-semibold text-gray-800 flex justify-center">
                Login
            </h2>

            <Badge color="indigo">Devoteee</Badge>

            <div>
                <Label for="phone">Phone</Label>
                <Input
                    id="phone"
                    type="text"
                    bind:value={phone}
                    placeholder="Phone"
                    inputmode="tel"
                    autocomplete="tel"
                />
            </div>

            <div>
                <Label for="temp">Password</Label>
                <Input
                    id="temp"
                    type="text"
                    bind:value={password}
                    placeholder="Enter password"
                    disabled={loading}
                />
            </div>

            <div class="flex items-center justify-center">
                <Button
                    type="submit"
                    disabled={loading}
                    aria-disabled={loading}
                    class="min-lg:w-7xl"
                >
                    {#if loading}Verifying...{:else}Login{/if}
                </Button>
            </div>
        </form>
    </Card>
</div>
