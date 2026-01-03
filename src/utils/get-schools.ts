import {apiClient} from "@/api/api-client"


export async function getSchools() {
    const schools = await apiClient.schoolService.getSchools()

    return schools

}
