<script lang="ts">
    import { onMount } from "svelte";
    import { Card, Avatar, Badge, Button } from "flowbite-svelte";
    import { profile } from "@src/api.js";
    import { goto } from "$app/navigation";

    let profile: any = null;
    let error: string | null = null;
    let loading = true;

    const truthyInt = (v: any) => Number(v) === 1;

    onMount(async () => {
        try {
            profile = await profile();
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
    {:else if profile}
        <Card
            class="card w-full max-w-lg p-6 bg-white shadow-xl rounded-3xl transition-transform transform hover:scale-[1.02] hover:shadow-2xl"
        >
            <div class="flex flex-col items-center space-y-4">
                <Avatar
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.devoteee_name ?? profile.owner ?? "User")}&background=random`}
                    alt="Avatar"
                    size="xl"
                    cornerStyle="rounded"
                />
                <div class="text-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-1">
                        {profile.devoteee_name ?? profile.owner ?? profile.name}
                    </h2>
                    <p class="text-gray-500 text-sm">
                        {profile.doctype ?? "Darshan Devoteee Profile"}
                    </p>
                </div>
            </div>

            <div class="mt-6 space-y-3 text-gray-700">
                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Phone</span>
                    <span>{profile.phone ?? "—"}</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Email</span>
                    <span class="text-sm text-gray-600"
                        >{profile.email ?? profile.frappe_profile ?? "—"}</span
                    >
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Gender</span>
                    <span class="capitalize">{profile.gender ?? "—"}</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Date of Birth</span>
                    <span>{profile.dob}</span>
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">E-KYC</span>
                    <Badge
                        color={truthyInt(profile.is_ekyc_complete)
                            ? "success"
                            : "warning"}
                    >
                        {truthyInt(profile.is_ekyc_complete)
                            ? "Completed"
                            : "Pending"}
                    </Badge>
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Companion</span>
                    <Badge
                        color={truthyInt(profile.is_devoteee_companion)
                            ? "info"
                            : "gray"}
                    >
                        {truthyInt(profile.is_devoteee_companion)
                            ? "Yes"
                            : "No"}
                    </Badge>
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Aadhar</span>
                    <span class="text-sm text-gray-600"
                        >{profile.aadhar ?? "—"}</span
                    >
                </div>

                <div class="flex justify-between border-b pb-2">
                    <span class="font-medium">Address</span>
                    <span class="text-sm text-gray-600"
                        >{profile.address ?? "—"}</span
                    >
                </div>

                <div class="flex justify-between">
                    <span class="font-medium">Created On</span>
                    <span>{profile.creation}</span>
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
