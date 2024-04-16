/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import { AddonProps } from 'src/SqlLab/addons/types';
import { api, JsonResponse } from 'src/hooks/apiResources/queryApi';
import DataSourcePanel from 'src/explore/components/DatasourcePanel';

const exploreApi = api.injectEndpoints({
  endpoints: builder => ({
    explore: builder.query<Record<string, any>, void>({
      query: () => ({
        endpoint: '/api/v1/explore/?slice_id=24771',
        transformResponse: ({ json }: JsonResponse) => json.result,
      }),
    }),
  }),
});

const { useExploreQuery } = exploreApi;

// TODO: POC only component can be removed after PR approved
const ExampleAddon: React.FC<AddonProps> = ({ width }) => {
  const { data } = useExploreQuery();
  return (
    <>
      {data && (
        <DataSourcePanel
          formData={data.form_data}
          datasource={data.dataset}
          controls={{ datasource: {} }}
          actions={{ setControlValue: () => {} }}
          width={width - 80}
        />
      )}
    </>
  );
};

export default ExampleAddon;
