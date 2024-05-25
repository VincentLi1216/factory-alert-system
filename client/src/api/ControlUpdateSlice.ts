import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const controlUpdateSlice = createApi({
	reducerPath: 'controlUpdateSlice',
	baseQuery: fetchBaseQuery({ 
		baseUrl: 'http://localhost:8282', 
	}),
	endpoints: builder => ({
		basic: builder.query({
			query: () => ({
				url: `/`,
				method: 'GET',
			})
		}),
		roi: builder.mutation({
			query: (payload) => {
				if (payload.length === 0) {
					return ({
						url: 'roi',
						method: 'POST',
						body: {
							startX: 0,
							startY: 0,
							width: 0,
							height: 0,
						},
					})
				}
				return({
					url: 'roi',
					method: 'POST',
					body: {
						startX: payload[payload.length-1].x,
						startY: payload[payload.length-1].y,
						width: payload[payload.length-1].width,
						height: payload[payload.length-1].height,
						},
				})
			},
		}),
	}),
})

export const { 
	useBasicQuery, 
	useRoiMutation
} = controlUpdateSlice
