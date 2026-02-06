import apiClient from "@/api/api-client"


export async function getSchools(schoolDist:number) {
	const schools = await apiClient.schoolService.getSchools()
	return schools.filter((school) =>
		Number(school.geographical_district_code) === schoolDist
	)
}
