<script lang="ts">
    import { onMount } from "svelte";
    import { Card, Avatar, Badge, Button } from "flowbite-svelte";
    import { profile } from "@src/api.js";
    import { goto } from "$app/navigation";

    let profile_details: any = null;
    let error: string | null = null;
    let loading = true;

    const truthyInt = (v: any) => Number(v) === 1;

    onMount(async () => {
        try {
            profile_details = await profile();
        } catch (e) {
            error = "Failed to load profile";
            console.error(e);
        } finally {
            loading = false;
        }
    });

    function updateProfile() {
        // navigate to update page (keeps original behavior)
        goto("/dashboard/profile/update_profile");
    }
</script>

<div
    class="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4"
>
    {#if loading}
        <div class="animate-pulse text-gray-600 text-lg">
            Loading profile...
        </div>
    {:else if error}
        <div
            class="text-red-600 bg-red-100 border border-red-300 px-4 py-3 rounded-lg shadow-sm"
        >
            {error}
        </div>
    {:else if profile_details}
        <Card
            class="card w-full max-w-lg p-6 bg-white shadow-xl rounded-3xl transition-transform transform hover:scale-[1.02] hover:shadow-2xl"
        >
            <div class="flex flex-col items-center space-y-4">
                <Avatar
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile_details.devoteee_name ?? profile_details.owner ?? "User")}&background=random`}
                    alt="Avatar"
                    size="xl"
                    cornerStyle="rounded"
                />
                <div class="text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-1">
                        {profile_details.devoteee_name ??
                            profile_details.owner ??
                            profile_details.name}
                    </h2>
                    <p class="text-gray-500 text-sm">
                        {profile_details.doctype ??
                            "Darshan Devoteee profile_details"}
                    </p>
                </div>
            </div>

            <div class="mt-6 space-y-3 text-gray-700">
                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Phone</span>
                    <span>{profile_details.phone ?? "—"}</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Email</span>
                    <span class="text-sm text-gray-600"
                        >{profile_details.email ??
                            profile_details.frappe_profile_details ??
                            "—"}</span
                    >
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Gender</span>
                    <span class="capitalize"
                        >{profile_details.gender ?? "—"}</span
                    >
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Date of Birth</span>
                    <span>{profile_details.dob}</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">E-KYC</span>
                    <Badge
                        color={truthyInt(profile_details.is_ekyc_complete)
                            ? "success"
                            : "warning"}
                    >
                        {truthyInt(profile_details.is_ekyc_complete)
                            ? "Completed"
                            : "Pending"}
                    </Badge>
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Companion</span>
                    <Badge
                        color={truthyInt(profile_details.is_devoteee_companion)
                            ? "info"
                            : "gray"}
                    >
                        {truthyInt(profile_details.is_devoteee_companion)
                            ? "Yes"
                            : "No"}
                    </Badge>
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Aadhar</span>
                    <span class="text-sm text-gray-600"
                        >{profile_details.aadhar ?? "—"}</span
                    >
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">location</span>
                    <span class="text-sm text-gray-600"
                        >{profile_details.location ?? "—"}</span
                    >
                </div>

                <div class="flex justify-between">
                    <span class="font-medium">Created On</span>
                    <span>{profile_details.creation}</span>
                </div>
            </div>

            <div class="mt-8 flex justify-center space-x-4">
                <Button
                    color="light"
                    class="rounded-full px-5 py-2 font-medium"
                    onclick={() => updateProfile()}
                >
                    Update Profile
                </Button>
            </div>
        </Card>
    {:else}
        <p class="text-gray-600">No profile found.</p>
    {/if}
</div>
