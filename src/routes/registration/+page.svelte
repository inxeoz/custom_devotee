<script lang="ts">
    import { goto } from "$app/navigation";
    import { Card, Button, Label, Input } from "flowbite-svelte";
    import { Badge } from "flowbite-svelte";

    import { registration_devoteee } from "@src/helper_devoteee.js";
    import { toast } from "svelte-sonner";

    // phone as string to allow leading + / 0 etc
    let phone: number;
    let loading: boolean = false;

    async function login(e: SubmitEvent) {
        e?.preventDefault();

        loading = true;

        const json_data = await registration_devoteee(phone);

        if (json_data?.message) {
            toast.success("Registration Success");
            await goto("/login");
        } else {
            // show API message or generic error
            toast.error("Registration failed" + JSON.stringify(json_data));
            loading = false;
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <Card class="w-full max-w-md p-10">
        <form class="space-y-4" on:submit={login} aria-busy={loading}>
            <h2 class="text-xl font-semibold text-gray-800 flex justify-center">
                Registration
            </h2>

            <Badge color="indigo">Devoteee</Badge>

            <div>
                <Label for="phone">Phone</Label>
                <Input
                    id="phone"
                    type="text"
                    bind:value={phone}
                    placeholder="Enter your phone"
                    inputmode="tel"
                    autocomplete="tel"
                />
            </div>

            <div class="flex items-center justify-center">
                <Button
                    type="submit"
                    disabled={loading}
                    aria-disabled={loading}
                    class="min-lg:w-7xl"
                >
                    {#if loading}Verifying...{:else}Register{/if}
                </Button>
            </div>
        </form>
    </Card>
</div>
