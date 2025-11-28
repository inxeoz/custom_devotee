<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { Card, Button, Alert, Badge } from "flowbite-svelte";

    import { profile } from "@src/api.js";
    interface ProfileDetails {
        devoteee_name?: string;
        aadhar?: number;
        [key: string]: any;
    }

    export let title = "Dashboard";
    export let welcome = "Welcome back!";

    let profile_details: ProfileDetails | null = null;
    let devoteee_name = "";
    let is_ekyc_complete = 0;
    let show_dashboard = false;

    const defaultActions = [
        {
            id: "myProfile",
            label: "My Profile",
            site: "/dashboard/profile/",
            button_color: "green",
        },
        {
            id: "viewBookings",
            label: "View Bookings",
            site: "/dashboard/mybooking",
            button_color: "blue",
        },
        {
            id: "bookVip",
            label: "Book - VIP Darshan",
            site: "/dashboard/vipdarshan",
            button_color: "blue",
        },
        {
            id: "bookShigra",
            label: "Book - Shigra Darshan",
            site: "/dashboard/shigra",
            button_color: "light",
        },

        {
            id: "bookLocalide",
            label: "Book - Localide Darshan",
            site: "/dashboard/localide",
            button_color: "light",
        },
        {
            id: "bookBhasm",
            label: "Book - Bhasm Arti",
            site: "/dashboard/bhasmarti",
            button_color: "light",
        },
    ];

    onMount(async () => {
        try {
            const profile_details = await profile();

            if (profile_details) {
                console.log(profile_details);
                console.log(profile_details.aadhar);
                devoteee_name = profile_details.devoteee_name || "";
                is_ekyc_complete =
                    profile_details?.aadhar?.toString().length ?? 0;

                show_dashboard = true;
            }
        } catch (error) {
            console.error("Failed to load profile:", error);
        }
    });

    function onActionClicked(site?: string) {
        if (site) goto(site);
    }
</script>

<div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    {#if show_dashboard}
        <Card class="w-full max-w-2xl text-center p-10">
            <h1 class="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
            <p class="text-gray-600 mb-4">
                {welcome}
                {#if devoteee_name}
                    {devoteee_name}
                {/if}
            </p>

            {#if is_ekyc_complete === 0}
                <Alert color="red">
                    Please complete your profile to continue.
                    <Badge
                        color="gray"
                        outline
                        size="sm"
                        class="ml-2 cursor-pointer"
                        onclick={() =>
                            goto("/dashboard/profile/update_profile")}
                    >
                        Complete the Profile
                    </Badge>
                </Alert>
            {/if}

            <div class="grid gap-3 mt-4">
                {#each defaultActions as action (action.id)}
                    <Button
                        color={action.button_color}
                        onclick={() => onActionClicked(action.site)}
                        pill
                    >
                        {action.label}
                    </Button>
                {/each}
            </div>
        </Card>
    {:else}
        <p class="text-gray-600">
            Details Not Found ! <Badge
                color="red"
                class="cursor-pointer"
                onclick={() => goto("/login")}>Login First</Badge
            >
        </p>
    {/if}
</div>
