import React, { useState } from 'react'
import { Viro3DObject, ViroMaterials, ViroAnimations } from 'react-viro'

export class ModelComponent extends React.Component {

  componentDidMount(){
    const { model, runAnimation } = this.props;
    
    const modelMaterials = model.resources.filter(resource => resource.resourceType !== "mtl").reduce((acc, resource) => ({
      ...acc,
      [resource.resourceType]: { uri: resource.resourceUrl }
    }), {})

    ViroMaterials.createMaterials({
      modelMaterial: {
        lightingModel: model.lightingModel,
        ...modelMaterials
      },
    });
    ViroAnimations.registerAnimations({
      scaleModel: {
        properties: model.scale || {},
        duration: 1000, easing: "bounce"
      }
    });
  }

  render(){
    const mtLFileIfAny = this.props.model.resources
      .filter(resource => resource.type === "mtl")
      .map(resource => ({ uri: resource.resourceUrl}));
      
    return (
      <Viro3DObject
        source={{uri: this.props.model.url}}
        resources={mtLFileIfAny}
        onLoadStart={() => {}}
        onLoadEnd={(data) => {
          alert("Loaded")
        }}
        materials={["modelMaterial"]}
        onError={(event) => {
          alert("Some error")
        }}  
        onDrag={() => {}}
        scale={[0, 0, 0 ]}
        position={[0,0,0]}
        rotation={[0,0,0]}
        dragType="FixedToWorld"
        animation={{name:"scaleModel", run: this.props.runAnimation}}
       type="OBJ"/>
    )
  }
}