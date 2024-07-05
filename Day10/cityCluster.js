class cityCluster {
  constructor(cities) {
      this.cities = cities;
  }
  //cities : location 객체 배열
  //centroids : 중심값 객체 배열
  //xField : x축 데이터
  //yField : y축 데이터
  calcDistance(city, centroid, xField, yField) {
      const dx = city[xField] - centroid[xField];
      const dy = city[yField] - centroid[yField];
      return Math.sqrt(dx * dx + dy * dy);
  }

  kmeans(cities, centroids, xField, yField) {
      const k = centroids.length;
      let clusters;
      while (true) {
          clusters = Array.from({length: k}, () => []); //k개의 빈 배열을 만들어준다.
          //clusters 배열에는 각 클러스터에 속하는 도시 객체들이 들어간다.
          cities.forEach((city) => {
              let minDistanc = Infinity; //중심값과 도시사이의 최소 거리를 구한다.
              let clusterIndex = -1; //속할 클러스터의 인덱스를 저장한다.
              centroids.forEach((centroid, index) => {
                  const distance = this.calcDistance(city, centroid, xField, yField);
                  if (distance < minDistanc) {
                      minDistanc = distance;
                      clusterIndex = index;
                  }
              });
              clusters[clusterIndex].push(city);  // 도시를 해당 클러스터에 추가
          })

          //새로운 중심값 구하기
          const newCentroids = clusters.map(cluster => {
              let sumX = 0;
              let sumY = 0;

              // Calculate sum of xField and yField for all cities in the cluster
              cluster.forEach(city => {
                  sumX += city[xField];
                  sumY += city[yField];
              });

              // Calculate average x and y values
              const avgX = sumX / cluster.length;
              const avgY = sumY / cluster.length;

              return {
                  [xField]: avgX,
                  [yField]: avgY
              };
          });


          if (centroids.every((centroid, index) =>
              centroid[xField] === newCentroids[index][xField] &&
              centroid[yField] === newCentroids[index][yField]
          )) {
              break;   //중심값의 변화가 없다면 break; 후 출력
          }

          centroids = newCentroids;
      }
      return {centroids, clusters};
  }

  kmeans_pop(k, initialCentroids) {
      const {centroids, clusters} = this.kmeans(this.cities, initialCentroids, 'year', 'population');
      return { centroids, clusters };
  }

  kmeans_long(k, initialCentroids) {
      const {centroids, clusters} = this.kmeans(this.cities, initialCentroids, 'year', 'longitude');
      return { centroids, clusters };
  }
}

module.exports = cityCluster;